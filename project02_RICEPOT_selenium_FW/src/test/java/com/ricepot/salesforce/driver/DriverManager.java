package com.ricepot.salesforce.driver;

import org.openqa.selenium.WebDriver;

public final class DriverManager {

    private static final ThreadLocal<WebDriver> DRIVER_THREAD_LOCAL = new ThreadLocal<>();

    private DriverManager() {}

    public static WebDriver getDriver() {
        return DRIVER_THREAD_LOCAL.get();
    }

    public static void setDriver(WebDriver driver) {
        DRIVER_THREAD_LOCAL.set(driver);
    }

    public static void quitDriver() {
        WebDriver driver = DRIVER_THREAD_LOCAL.get();
        if (driver != null) {
            driver.quit();
            DRIVER_THREAD_LOCAL.remove();
        }
    }
}
