package com.ricepot.salesforce.tests;

import com.ricepot.salesforce.config.ConfigReader;
import io.qameta.allure.Description;
import io.qameta.allure.Feature;
import io.qameta.allure.Severity;
import io.qameta.allure.SeverityLevel;
import io.qameta.allure.Story;
import org.testng.Assert;
import org.testng.annotations.Test;

@Feature("Salesforce Login — Invalid Credentials")
public class InvalidLoginTest extends BaseTest {

    @Test(
            groups = {"regression"},
            description = "Verify error shown for valid email with wrong password",
            priority = 1
    )
    @Description("Submit valid username and an incorrect password; assert error message is displayed")
    @Severity(SeverityLevel.CRITICAL)
    @Story("US-003: Invalid password shows error message")
    public void testInvalidPassword() {
        try {
            loginPage.doLogin(
                    ConfigReader.get("valid.username"),
                    ConfigReader.get("invalid.password")
            );

            Assert.assertTrue(
                    loginPage.isErrorDisplayed(),
                    "Expected login error to be displayed for invalid password"
            );
        } catch (AssertionError ae) {
            throw ae;
        } catch (Exception e) {
            throw new RuntimeException("testInvalidPassword encountered an error", e);
        }
    }

    @Test(
            groups = {"regression"},
            description = "Verify error shown for completely invalid credentials",
            priority = 2
    )
    @Description("Submit both an unregistered username and wrong password; assert error is shown")
    @Severity(SeverityLevel.CRITICAL)
    @Story("US-004: Invalid username and password shows error message")
    public void testInvalidUsernameAndPassword() {
        try {
            loginPage.doLogin(
                    ConfigReader.get("invalid.username"),
                    ConfigReader.get("invalid.password")
            );

            Assert.assertTrue(
                    loginPage.isErrorDisplayed(),
                    "Expected login error to be displayed for invalid username and password"
            );
        } catch (AssertionError ae) {
            throw ae;
        } catch (Exception e) {
            throw new RuntimeException("testInvalidUsernameAndPassword encountered an error", e);
        }
    }

    @Test(
            groups = {"regression"},
            description = "Verify error or blocked submission when both fields are empty",
            priority = 3
    )
    @Description("Click Login without entering any credentials; assert page does not navigate away or shows error")
    @Severity(SeverityLevel.NORMAL)
    @Story("US-005: Empty credentials do not allow login")
    public void testEmptyCredentials() {
        try {
            loginPage.clickLoginButton();

            String currentUrl = loginPage.getCurrentUrl();
            boolean stayedOnLoginPage = currentUrl.contains("login.salesforce.com")
                    || loginPage.isErrorDisplayed();

            Assert.assertTrue(
                    stayedOnLoginPage,
                    "Expected to remain on login page or see error when submitting empty credentials"
            );
        } catch (AssertionError ae) {
            throw ae;
        } catch (Exception e) {
            throw new RuntimeException("testEmptyCredentials encountered an error", e);
        }
    }

    @Test(
            groups = {"regression"},
            description = "Verify error shown for malformed email format",
            priority = 4
    )
    @Description("Enter a malformed email (missing @) and valid password; assert error or validation block")
    @Severity(SeverityLevel.MINOR)
    @Story("US-006: Malformed email format triggers validation error")
    public void testInvalidEmailFormat() {
        try {
            loginPage.doLogin("notanemail", ConfigReader.get("invalid.password"));

            String currentUrl = loginPage.getCurrentUrl();
            boolean errorOrBlocked = loginPage.isErrorDisplayed()
                    || currentUrl.contains("login.salesforce.com");

            Assert.assertTrue(
                    errorOrBlocked,
                    "Expected error or remain on login page when entering malformed email"
            );
        } catch (AssertionError ae) {
            throw ae;
        } catch (Exception e) {
            throw new RuntimeException("testInvalidEmailFormat encountered an error", e);
        }
    }
}
