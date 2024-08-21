import { expect, Page } from "@playwright/test";

export default class LoginPage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Navigate to the login page
    public async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    // Locators for elements on the login page
    private usernameInput = () => this.page.locator('input[data-test="username"]');
    private passwordInput = () => this.page.locator('input[data-test="password"]');
    private loginButton = () => this.page.locator('input[data-test="login-button"]');
    private errorMessage = () => this.page.locator('[data-test="error"]');

    // Fill in the username field
    public async enterUsername(username: string) {
        await this.usernameInput().fill(username);
    }
      
    // Fill in the password field
    public async enterPassword(password: string) {
        await this.passwordInput().fill(password);
    }
      
    // Click the login button
    public async login() {
        await this.loginButton().click();
    }

    // Check if the error message is visible
    public async isErrorMessageVisible() {
        await expect(this.errorMessage()).toBeVisible();
    }

    // Verify the error message text
    public async errorMessageContains(expectedMessage: string) {
        await expect(this.errorMessage()).toHaveText(expectedMessage);
    }

    // Verify that the login page is displayed
    public async isLoginPageDisplayed() {
        await expect(this.loginButton()).toBeVisible();
    }
}
