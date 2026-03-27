package com.ricepot.salesforce.utils;

import io.qameta.allure.Attachment;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

public final class ScreenshotUtil {

    private static final Logger LOG = LogManager.getLogger(ScreenshotUtil.class);

    private ScreenshotUtil() {}

    @Attachment(value = "Screenshot — {testName}", type = "image/png")
    public static byte[] captureScreenshot(WebDriver driver, String testName) {
        try {
            return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
        } catch (Exception e) {
            LOG.error("Failed to capture screenshot for test [{}]: {}", testName, e.getMessage());
            return new byte[0];
        }
    }
}
