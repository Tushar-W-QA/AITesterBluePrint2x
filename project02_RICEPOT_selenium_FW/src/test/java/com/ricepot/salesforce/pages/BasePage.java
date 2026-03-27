package com.ricepot.salesforce.pages;

import com.ricepot.salesforce.config.ConfigReader;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public abstract class BasePage {

    protected final WebDriver driver;
    protected final WebDriverWait wait;

    protected BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(ConfigReader.getInt("explicit.wait")));
    }

    protected void waitAndClick(WebElement element) {
        try {
            wait.until(ExpectedConditions.elementToBeClickable(element)).click();
        } catch (Exception e) {
            throw new RuntimeException("Failed to click element: " + element, e);
        }
    }

    protected void waitAndType(WebElement element, String text) {
        try {
            WebElement visible = wait.until(ExpectedConditions.visibilityOf(element));
            visible.clear();
            visible.sendKeys(text);
        } catch (Exception e) {
            throw new RuntimeException("Failed to type into element: " + element, e);
        }
    }

    protected WebElement waitForVisibility(WebElement element) {
        try {
            return wait.until(ExpectedConditions.visibilityOf(element));
        } catch (Exception e) {
            throw new RuntimeException("Element not visible: " + element, e);
        }
    }

    protected boolean isElementVisible(WebElement element) {
        try {
            return wait.until(ExpectedConditions.visibilityOf(element)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    protected boolean waitForUrlContains(String urlFragment) {
        try {
            return wait.until(ExpectedConditions.urlContains(urlFragment));
        } catch (Exception e) {
            return false;
        }
    }

    public String getCurrentUrl() {
        try {
            return driver.getCurrentUrl();
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve current URL", e);
        }
    }
}
