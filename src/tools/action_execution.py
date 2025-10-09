from appium.webdriver.common.appiumby import AppiumBy
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from appium.webdriver.webdriver import WebDriver
import asyncio

class ActionExecutor:
    def __init__(self, driver: WebDriver, default_timeout=15):
        self.driver = driver
        self.default_timeout = default_timeout

    async def tap(self, locator_type, locator):
        try:
            element = self.wait_for_element(locator_type, locator)
            element.click()
        except (TimeoutException, NoSuchElementException):
            # Retry after delay
            await asyncio.sleep(1)
            element = self.wait_for_element(locator_type, locator)
            element.click()

    def wait_for_element(self, locator_type, locator, timeout=None):
        timeout = timeout or self.default_timeout
        elapsed = 0
        interval = 0.5
        while elapsed < timeout:
            try:
                elem = self.driver.find_element(locator_type, locator)
                if elem.is_displayed():
                    return elem
            except Exception:
                pass
            asyncio.sleep(interval)
            elapsed += interval
        raise TimeoutException(f"Element {locator} not found after {timeout} seconds")

    async def type_text(self, locator_type, locator, text):
        elem = self.wait_for_element(locator_type, locator)
        elem.clear()
        elem.send_keys(text)
