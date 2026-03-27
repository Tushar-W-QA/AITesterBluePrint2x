package com.ricepot.salesforce.tests;

import com.ricepot.salesforce.config.ConfigReader;
import io.qameta.allure.Description;
import io.qameta.allure.Feature;
import io.qameta.allure.Severity;
import io.qameta.allure.SeverityLevel;
import io.qameta.allure.Story;
import org.testng.Assert;
import org.testng.annotations.Test;

@Feature("Salesforce Login — Valid Credentials")
public class ValidLoginTest extends BaseTest {

    @Test(
            groups = {"sanity"},
            description = "Verify successful login with valid credentials",
            priority = 1
    )
    @Description("Login with a valid registered Salesforce user and assert redirection to home")
    @Severity(SeverityLevel.CRITICAL)
    @Story("US-001: User can log in with correct credentials")
    public void testValidLoginWithCorrectCredentials() {
        try {
            String username = ConfigReader.get("valid.username");
            String password = ConfigReader.get("valid.password");

            loginPage.doLogin(username, password);

            Assert.assertTrue(
                    loginPage.isLoginSuccessful(),
                    "Expected URL to contain 'lightning.force.com' or 'salesforce.com/home' after valid login"
            );
        } catch (AssertionError ae) {
            throw ae;
        } catch (Exception e) {
            throw new RuntimeException("testValidLoginWithCorrectCredentials encountered an error", e);
        }
    }

    @Test(
            groups = {"sanity"},
            description = "Verify successful login with Remember Me selected",
            priority = 2
    )
    @Description("Login with valid credentials and Remember Me checked; assert successful redirection")
    @Severity(SeverityLevel.NORMAL)
    @Story("US-002: Remember Me persists username across sessions")
    public void testValidLoginWithRememberMe() {
        try {
            String username = ConfigReader.get("valid.username");
            String password = ConfigReader.get("valid.password");

            loginPage.doLoginWithRememberMe(username, password);

            Assert.assertTrue(
                    loginPage.isLoginSuccessful(),
                    "Expected successful login after selecting Remember Me"
            );
        } catch (AssertionError ae) {
            throw ae;
        } catch (Exception e) {
            throw new RuntimeException("testValidLoginWithRememberMe encountered an error", e);
        }
    }
}
