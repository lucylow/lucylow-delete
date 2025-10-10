from appium import webdriver
import time
import logging
from typing import Optional, Dict, Any
import subprocess
import json
import asyncio
from selenium.common.exceptions import WebDriverException, TimeoutException

logger = logging.getLogger("autorl.device_manager")

class RobustDeviceManager:
    """Robust device manager with comprehensive error handling and retry logic"""
    
    def __init__(self, device_id: str):
        self.device_id = device_id
        self.driver: Optional[webdriver.Remote] = None
        self.connection_retries = 0
        self.max_retries = 3
        self.logger = logging.getLogger(f"autorl.device_manager.{device_id}")
    
    def verify_prerequisites(self) -> bool:
        """Verify Appium server and device connectivity"""
        try:
            # Check if Appium server is running
            response = subprocess.run(
                ["curl", "-s", "http://localhost:4723/wd/hub/status"],
                capture_output=True,
                text=True,
                timeout=5
            )
            
            if response.returncode != 0:
                self.logger.error("Appium server not accessible at localhost:4723")
                return False
            
            # Check device connectivity
            adb_result = subprocess.run(
                ["adb", "devices"],
                capture_output=True,
                text=True,
                timeout=5
            )
            
            if self.device_id not in adb_result.stdout:
                self.logger.error(f"Device {self.device_id} not found in adb devices")
                return False
                
            self.logger.info("Prerequisites verified successfully")
            return True
            
        except subprocess.TimeoutExpired:
            self.logger.error("Timeout checking prerequisites")
            return False
        except Exception as e:
            self.logger.error(f"Error checking prerequisites: {e}")
            return False
    
    async def connect_with_retry(self) -> bool:
        """Connect to device with exponential backoff retry"""
        
        if not self.verify_prerequisites():
            return False
        
        desired_caps = {
            "platformName": "Android",
            "platformVersion": "11",
            "deviceName": self.device_id,
            "automationName": "UiAutomator2",
            "noReset": True,
            "newCommandTimeout": 60,
            "uiautomator2ServerInstallTimeout": 60000,
            "adbExecTimeout": 20000
        }
        
        while self.connection_retries < self.max_retries:
            try:
                self.logger.info(f"Attempting device connection (attempt {self.connection_retries + 1})")
                
                self.driver = webdriver.Remote(
                    "http://localhost:4723/wd/hub",
                    desired_capabilities=desired_caps
                )
                
                # Verify connection with simple command
                self.driver.get_window_size()
                
                self.logger.info(f"Successfully connected to device {self.device_id}")
                return True
                
            except Exception as e:
                self.connection_retries += 1
                wait_time = min(2 ** self.connection_retries, 30)  # Exponential backoff, max 30s
                
                self.logger.warning(f"Connection attempt {self.connection_retries} failed: {e}")
                self.logger.info(f"Waiting {wait_time}s before retry...")
                
                await asyncio.sleep(wait_time)
                
                if self.driver:
                    try:
                        self.driver.quit()
                    except:
                        pass
                    self.driver = None
        
        self.logger.error(f"Failed to connect to device after {self.max_retries} attempts")
        return False
    
    async def capture_screenshot_with_retry(self) -> Optional[bytes]:
        """Capture screenshot with retry logic"""
        if not self.driver:
            if not await self.connect_with_retry():
                return None
        
        for attempt in range(3):
            try:
                screenshot_data = self.driver.get_screenshot_as_png()
                if screenshot_data and len(screenshot_data) > 1000:  # Sanity check
                    return screenshot_data
                else:
                    raise Exception("Screenshot data appears invalid or too small")
                    
            except Exception as e:
                self.logger.warning(f"Screenshot attempt {attempt + 1} failed: {e}")
                if attempt < 2:  # Don't wait on last attempt
                    await asyncio.sleep(1)
                else:
                    self.logger.error("All screenshot attempts failed")
                    return None
    
    async def execute_command_with_retry(
        self, 
        command_type: str, 
        **kwargs
    ) -> bool:
        """Execute device commands with retry logic"""
        if not self.driver:
            if not await self.connect_with_retry():
                return False
        
        for attempt in range(3):
            try:
                if command_type == "tap":
                    x, y = kwargs.get("x"), kwargs.get("y")
                    self.driver.tap([(x, y)])
                elif command_type == "swipe":
                    self.driver.swipe(
                        kwargs.get("start_x"),
                        kwargs.get("start_y"),
                        kwargs.get("end_x"),
                        kwargs.get("end_y"),
                        kwargs.get("duration", 1000)
                    )
                elif command_type == "type":
                    element = self.driver.find_element(
                        kwargs.get("by"), kwargs.get("value")
                    )
                    element.clear()
                    element.send_keys(kwargs.get("text"))
                
                self.logger.info(f"Command {command_type} executed successfully")
                return True
                
            except Exception as e:
                self.logger.warning(f"Command {command_type} attempt {attempt + 1} failed: {e}")
                if attempt < 2:
                    await asyncio.sleep(0.5)
        
        self.logger.error(f"Command {command_type} failed after all retries")
        return False
    
    async def find_element_with_retry(
        self,
        by: str,
        value: str,
        timeout: int = 10
    ) -> Optional[Any]:
        """Find UI element with retry logic"""
        if not self.driver:
            if not await self.connect_with_retry():
                return None
        
        for attempt in range(3):
            try:
                element = self.driver.find_element(by, value)
                if element:
                    return element
                else:
                    raise Exception("Element not found")
                    
            except Exception as e:
                self.logger.warning(f"Element search attempt {attempt + 1} failed: {e}")
                if attempt < 2:
                    await asyncio.sleep(1)
        
        self.logger.error(f"Element not found after all retries: {by}={value}")
        return None
    
    async def wait_for_element_with_retry(
        self,
        by: str,
        value: str,
        timeout: int = 30
    ) -> bool:
        """Wait for element to appear with retry logic"""
        if not self.driver:
            if not await self.connect_with_retry():
                return False
        
        start_time = time.time()
        while time.time() - start_time < timeout:
            try:
                element = self.driver.find_element(by, value)
                if element and element.is_displayed():
                    self.logger.info(f"Element found and displayed: {by}={value}")
                    return True
            except:
                pass
            
            await asyncio.sleep(1)
        
        self.logger.warning(f"Element not found within timeout: {by}={value}")
        return False
    
    def get_device_info(self) -> Dict[str, Any]:
        """Get device information"""
        if not self.driver:
            return {"status": "disconnected", "device_id": self.device_id}
        
        try:
            return {
                "status": "connected",
                "device_id": self.device_id,
                "screen_size": self.driver.get_window_size(),
                "platform_version": self.driver.capabilities.get("platformVersion"),
                "automation_name": self.driver.capabilities.get("automationName")
            }
        except Exception as e:
            self.logger.error(f"Error getting device info: {e}")
            return {"status": "error", "device_id": self.device_id, "error": str(e)}
    
    def cleanup(self):
        """Clean up resources"""
        if self.driver:
            try:
                self.driver.quit()
                self.logger.info(f"Driver cleaned up for device {self.device_id}")
            except Exception as e:
                self.logger.warning(f"Error during driver cleanup: {e}")
            finally:
                self.driver = None

class DeviceManagerPool:
    """Pool of device managers for handling multiple devices"""
    
    def __init__(self):
        self.devices: Dict[str, RobustDeviceManager] = {}
        self.logger = logging.getLogger("autorl.device_pool")
    
    async def add_device(self, device_id: str) -> RobustDeviceManager:
        """Add a device to the pool"""
        if device_id not in self.devices:
            self.devices[device_id] = RobustDeviceManager(device_id)
            self.logger.info(f"Added device {device_id} to pool")
        
        # Ensure connection
        device_manager = self.devices[device_id]
        if not device_manager.driver:
            await device_manager.connect_with_retry()
        
        return device_manager
    
    async def remove_device(self, device_id: str):
        """Remove a device from the pool"""
        if device_id in self.devices:
            self.devices[device_id].cleanup()
            del self.devices[device_id]
            self.logger.info(f"Removed device {device_id} from pool")
    
    def get_device(self, device_id: str) -> Optional[RobustDeviceManager]:
        """Get device manager by ID"""
        return self.devices.get(device_id)
    
    def get_all_devices(self) -> Dict[str, RobustDeviceManager]:
        """Get all devices"""
        return self.devices.copy()
    
    async def cleanup_all(self):
        """Clean up all devices"""
        for device_manager in self.devices.values():
            device_manager.cleanup()
        self.devices.clear()
        self.logger.info("All devices cleaned up")

# Global device manager pool
device_pool = DeviceManagerPool()




