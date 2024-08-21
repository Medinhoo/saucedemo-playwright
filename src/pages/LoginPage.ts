import { expect, Page } from "@playwright/test";

export default class LoginPage {

    page: Page

    constructor(page: Page) {
        this.page = page
    }

    public async goto() {
        await this.page.goto('https://www.saucedemo.com/')
    }

    // Locators 
    private usernameInput = () => this.page.locator('input[data-test="username"]')
    private passwordInput = () => this.page.locator('input[data-test="password"]')
    private loginButton = () => this.page.locator('input[data-test="login-button"]')
    private errorMessage = () => this.page.locator('[data-test="error"]')

    // Actions
    public async enterUsername(username: string) {
        await this.usernameInput().fill(username);
    }
      
    public async enterPassword(password: string) {
        await this.passwordInput().fill(password);
    }
      
    public async login() {
        await this.loginButton().click();
    }

    public async isErrorMessageVisible() {
        await expect(this.errorMessage()).toBeVisible();
    }

    public async errorMessageContains(expectedMessage: string) {
        await expect(this.errorMessage()).toHaveText(expectedMessage);
    }
}
