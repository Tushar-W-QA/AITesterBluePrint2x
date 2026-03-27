package com.ricepot.salesforce.tests;

import com.ricepot.salesforce.config.ConfigReader;
import com.ricepot.salesforce.driver.BrowserFactory;
import com.ricepot.salesforce.driver.DriverManager;
import com.ricepot.salesforce.pages.LoginPage;
import com.ricepot.salesforce.utils.ScreenshotUtil;
import io.qameta.allure.Step;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;

import java.lang.reflect.Method;

public abstract class BaseTest {

    protected static final Logger LOG = LogManager.getLogger(BaseTest.class);

    protected LoginPage loginPage;

    @BeforeTest(alwaysRun = true)
    public void suiteSetUp() {
        LOG.info("Suite setup initiated");
    }

    @BeforeMethod(alwaysRun = true)
    @Step("Initialize browser and navigate to Salesforce login page")
    public void setUp(Method method) {
        try {
            LOG.info("Starting test: {}", method.getName());
            WebDriver driver = BrowserFactory.createDriver();
            DriverManager.setDriver(driver);
            driver.manage().window().maximize();
            driver.get(ConfigReader.get("base.url"));
            loginPage = new LoginPage(driver);
        } catch (Exception e) {
            throw new RuntimeException("setUp failed for test: " + method.getName(), e);
        }
    }

    @AfterMethod(alwaysRun = true)
    public void tearDown(Method method) {
        try {
            LOG.info("Tearing down test: {}", method.getName());
            ScreenshotUtil.captureScreenshot(DriverManager.getDriver(), method.getName());
        } catch (Exception e) {
            LOG.warn("Screenshot capture failed during teardown: {}", e.getMessage());
        } finally {
            DriverManager.quitDriver();
        }
    }

    @AfterTest(alwaysRun = true)
    public void suiteTearDown() {
        LOG.info("Suite teardown completed");
    }
}
