package com.ricepot.salesforce.driver;

import com.ricepot.salesforce.config.ConfigReader;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.time.Duration;

public final class BrowserFactory {

    private BrowserFactory() {}

    public static WebDriver createDriver() {
        String browser = ConfigReader.get("browser").toLowerCase();
        int implicitWait = ConfigReader.getInt("implicit.wait");

        WebDriver driver = switch (browser) {
            case "chrome" -> {
                WebDriverManager.chromedriver().setup();
                ChromeOptions options = new ChromeOptions();
                options.addArguments("--start-maximized", "--disable-notifications", "--remote-allow-origins=*");
                yield new ChromeDriver(options);
            }
            case "firefox" -> {
                WebDriverManager.firefoxdriver().setup();
                FirefoxOptions options = new FirefoxOptions();
                yield new FirefoxDriver(options);
            }
            case "edge" -> {
                WebDriverManager.edgedriver().setup();
                EdgeOptions options = new EdgeOptions();
                yield new EdgeDriver(options);
            }
            default -> throw new RuntimeException("Unsupported browser configured: " + browser);
        };

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(implicitWait));
        return driver;
    }
}
