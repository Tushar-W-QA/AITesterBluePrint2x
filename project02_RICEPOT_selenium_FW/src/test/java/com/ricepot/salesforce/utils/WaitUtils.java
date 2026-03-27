package com.ricepot.salesforce.utils;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public final class WaitUtils {

    private WaitUtils() {}

    public static WebElement waitForElementVisible(WebDriver driver, By locator, long timeoutSeconds) {
        try {
            return new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds))
                    .until(ExpectedConditions.visibilityOfElementLocated(locator));
        } catch (Exception e) {
            throw new RuntimeException("Element not visible within " + timeoutSeconds + "s: " + locator, e);
        }
    }

    public static boolean waitForUrlContains(WebDriver driver, String urlFragment, long timeoutSeconds) {
        try {
            return new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds))
                    .until(ExpectedConditions.urlContains(urlFragment));
        } catch (Exception e) {
            return false;
        }
    }

    public static WebElement waitForElementClickable(WebDriver driver, By locator, long timeoutSeconds) {
        try {
            return new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds))
                    .until(ExpectedConditions.elementToBeClickable(locator));
        } catch (Exception e) {
            throw new RuntimeException("Element not clickable within " + timeoutSeconds + "s: " + locator, e);
        }
    }
}
