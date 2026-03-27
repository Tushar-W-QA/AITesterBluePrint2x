package com.ricepot.salesforce.pages;

import io.qameta.allure.Step;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage extends BasePage {

    @FindBy(xpath = "//input[@type='email' and @name='username']")
    private WebElement usernameField;

    @FindBy(xpath = "//input[@type='password' and @name='password']")
    private WebElement passwordField;

    @FindBy(xpath = "//input[@id='Login' and @type='submit']")
    private WebElement loginButton;

    @FindBy(xpath = "//input[@type='checkbox' and @name='rememberUn']")
    private WebElement rememberMeCheckbox;

    @FindBy(xpath = "//div[contains(@class,'loginError')]//p")
    private WebElement loginErrorMessage;

    @FindBy(xpath = "//div[@id='error']")
    private WebElement inlineErrorBanner;

    public LoginPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    @Step("Enter username: {username}")
    public LoginPage enterUsername(String username) {
        try {
            waitAndType(usernameField, username);
            return this;
        } catch (Exception e) {
            throw new RuntimeException("enterUsername failed for: " + username, e);
        }
    }

    @Step("Enter password")
    public LoginPage enterPassword(String password) {
        try {
            waitAndType(passwordField, password);
            return this;
        } catch (Exception e) {
            throw new RuntimeException("enterPassword failed", e);
        }
    }

    @Step("Click login button")
    public void clickLoginButton() {
        try {
            waitAndClick(loginButton);
        } catch (Exception e) {
            throw new RuntimeException("clickLoginButton failed", e);
        }
    }

    @Step("Toggle Remember Me checkbox")
    public LoginPage clickRememberMe() {
        try {
            waitAndClick(rememberMeCheckbox);
            return this;
        } catch (Exception e) {
            throw new RuntimeException("clickRememberMe failed", e);
        }
    }

    @Step("Perform full login with credentials")
    public void doLogin(String username, String password) {
        try {
            enterUsername(username);
            enterPassword(password);
            clickLoginButton();
        } catch (Exception e) {
            throw new RuntimeException("doLogin failed for user: " + username, e);
        }
    }

    @Step("Perform full login with Remember Me enabled")
    public void doLoginWithRememberMe(String username, String password) {
        try {
            enterUsername(username);
            clickRememberMe();
            enterPassword(password);
            clickLoginButton();
        } catch (Exception e) {
            throw new RuntimeException("doLoginWithRememberMe failed for user: " + username, e);
        }
    }

    @Step("Get login error message text")
    public String getErrorMessage() {
        try {
            WebElement error = isElementVisible(loginErrorMessage) ? loginErrorMessage : inlineErrorBanner;
            return waitForVisibility(error).getText();
        } catch (Exception e) {
            throw new RuntimeException("getErrorMessage failed — no error element visible", e);
        }
    }

    @Step("Verify login error is displayed")
    public boolean isErrorDisplayed() {
        try {
            return isElementVisible(loginErrorMessage) || isElementVisible(inlineErrorBanner);
        } catch (Exception e) {
            return false;
        }
    }

    @Step("Verify login was successful (URL changed to Salesforce home)")
    public boolean isLoginSuccessful() {
        try {
            return waitForUrlContains("lightning.force.com") || waitForUrlContains("salesforce.com/home");
        } catch (Exception e) {
            return false;
        }
    }

    @Step("Verify Remember Me checkbox is checked")
    public boolean isRememberMeChecked() {
        try {
            return waitForVisibility(rememberMeCheckbox).isSelected();
        } catch (Exception e) {
            throw new RuntimeException("isRememberMeChecked failed", e);
        }
    }
}
