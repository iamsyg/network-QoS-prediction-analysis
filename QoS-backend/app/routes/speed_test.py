from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import asyncio
import time
import aiohttp
from datetime import datetime
import statistics

router = APIRouter()

class SpeedTestResult(BaseModel):
    download_speed: float  # Mbps
    upload_speed: float    # Mbps
    latency: float         # ms
    jitter: float          # ms
    timestamp: str
    test_duration: float   # seconds

class SpeedTestError(BaseModel):
    error: str
    timestamp: str

# Test file URLs (various sizes) - Multiple mirrors for reliability
TEST_FILES = [
    "https://proof.ovh.net/files/10Mb.dat",  # 10MB
    "https://bouygues.testdebit.info/10M.iso",  # 10MB
    "http://ipv4.download.thinkbroadband.com/10MB.zip",  # 10MB
    "https://speed.hetzner.de/10MB.bin",  # 10MB
]

SMALL_TEST_FILES = [
    "https://proof.ovh.net/files/1Mb.dat",  # 1MB
    "https://bouygues.testdebit.info/1M.iso",  # 1MB
]

async def measure_latency(url: str = "https://www.google.com", count: int = 5):
    """Measure latency (ping) to a server"""
    latencies = []
    
    async with aiohttp.ClientSession() as session:
        for _ in range(count):
            try:
                start = time.time()
                async with session.get(url, timeout=aiohttp.ClientTimeout(total=5)) as response:
                    await response.read()
                latency = (time.time() - start) * 1000  # Convert to ms
                latencies.append(latency)
            except Exception:
                continue
    
    if not latencies:
        return 0, 0
    
    avg_latency = statistics.mean(latencies)
    jitter = statistics.stdev(latencies) if len(latencies) > 1 else 0
    
    return round(avg_latency, 2), round(jitter, 2)

async def measure_download_speed(duration: int = 10):
    """Measure download speed - tries multiple servers for reliability"""
    best_speed = 0
    
    for url in TEST_FILES:
        try:
            total_bytes = 0
            start_time = time.time()
            
            timeout = aiohttp.ClientTimeout(total=duration + 10, connect=5)
            async with aiohttp.ClientSession(timeout=timeout) as session:
                async with session.get(url) as response:
                    if response.status != 200:
                        continue
                    
                    async for chunk in response.content.iter_chunked(65536):  # 64KB chunks
                        total_bytes += len(chunk)
                        
                        # Stop after duration seconds
                        if time.time() - start_time >= duration:
                            break
            
            elapsed_time = time.time() - start_time
            
            # Only calculate if we got meaningful data (at least 1 second of download)
            if elapsed_time >= 1 and total_bytes > 0:
                # Convert bytes to megabits, divide by time to get Mbps
                speed_mbps = (total_bytes * 8) / (elapsed_time * 1_000_000)
                
                # Keep the best speed
                if speed_mbps > best_speed:
                    best_speed = speed_mbps
                    
                # If we got a good speed, return it
                if speed_mbps > 0.5:  # At least 0.5 Mbps
                    return round(speed_mbps, 2), elapsed_time
                    
        except Exception as e:
            print(f"Download test failed for {url}: {str(e)}")
            continue
    
    # Return best speed we got, or 0 if all failed
    return round(best_speed, 2), duration

async def measure_upload_speed(url: str = "https://httpbin.org/post", size_mb: int = 5):
    """Measure upload speed"""
    # Generate random data to upload
    data = b'0' * (size_mb * 1024 * 1024)  # size_mb MB of data
    
    start_time = time.time()
    
    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(
                url,
                data=data,
                timeout=aiohttp.ClientTimeout(total=30)
            ) as response:
                await response.read()
        except Exception as e:
            raise Exception(f"Upload test failed: {str(e)}")
    
    elapsed_time = time.time() - start_time
    
    # Convert bytes to megabits, divide by time to get Mbps
    speed_mbps = (len(data) * 8) / (elapsed_time * 1_000_000)
    
    return round(speed_mbps, 2), elapsed_time

@router.get("/speed-test", response_model=SpeedTestResult)
async def perform_speed_test():
    """
    Perform a complete internet speed test
    Measures download speed, upload speed, latency, and jitter
    """
    try:
        test_start = time.time()
        
        # Measure latency and jitter
        latency, jitter = await measure_latency()
        
        # Measure download speed (10 seconds test)
        download_speed, _ = await measure_download_speed(duration=10)
        
        # Measure upload speed (5MB upload)
        upload_speed, _ = await measure_upload_speed(size_mb=5)
        
        test_duration = round(time.time() - test_start, 2)
        
        return SpeedTestResult(
            download_speed=download_speed,
            upload_speed=upload_speed,
            latency=latency,
            jitter=jitter,
            timestamp=datetime.now().isoformat(),
            test_duration=test_duration
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/speed-test/quick", response_model=SpeedTestResult)
async def perform_quick_speed_test():
    """
    Perform a quick speed test (download and latency only)
    Faster but less comprehensive
    """
    try:
        test_start = time.time()
        
        # Measure latency
        latency, jitter = await measure_latency(count=3)
        
        # Quick download test (5 seconds)
        download_speed, _ = await measure_download_speed(duration=5)
        
        test_duration = round(time.time() - test_start, 2)
        
        return SpeedTestResult(
            download_speed=download_speed,
            upload_speed=0.0,  # Skip upload for quick test
            latency=latency,
            jitter=jitter,
            timestamp=datetime.now().isoformat(),
            test_duration=test_duration
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/speed-test/download")
async def test_download_only():
    """
    Test download speed only
    """
    try:
        download_speed, elapsed = await measure_download_speed(duration=10)
        
        return {
            "download_speed": download_speed,
            "test_duration": round(elapsed, 2),
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/speed-test/upload")
async def test_upload_only():
    """
    Test upload speed only
    """
    try:
        upload_speed, elapsed = await measure_upload_speed(size_mb=5)
        
        return {
            "upload_speed": upload_speed,
            "test_duration": round(elapsed, 2),
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/speed-test/latency")
async def test_latency_only():
    """
    Test latency (ping) and jitter only
    """
    try:
        latency, jitter = await measure_latency(count=10)
        
        return {
            "latency": latency,
            "jitter": jitter,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))