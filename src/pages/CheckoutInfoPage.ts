import { expect, Page } from "@playwright/test";

export default class CheckoutInfoPage {

    page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators 
    private titleCheckoutInfo = () => this.page.getByText('Checkout: Your Information');
    private inputFirstname = () => this.page.locator('input[data-test="firstName"]');
    private inputLastname = () => this.page.locator('input[data-test="lastName"]');
    private inputZipcode = () => this.page.locator('input[data-test="postalCode"]');
    private continueButton = () => this.page.locator('[data-test="continue"]');
    private errorMessage = () => this.page.locator('[data-test="error"]');

    // Actions
    public async isCheckoutInfoPageDisplayed() {
        await this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');
        await expect(this.titleCheckoutInfo()).toBeVisible();    
    }

    public async enterFirstname(firstname: string) {
        await this.inputFirstname().fill(firstname)
    }

    public async enterLastname(lastname: string) {
        await this.inputLastname().fill(lastname)
    }
    
    public async enterZipcode(zipcode: number) {
        await this.inputZipcode().fill(zipcode.toString())
    }

    public async clickContinue() {
        await this.continueButton().click()
    }

    public async isErrorMessageDisplayed(code: 'firstname' | 'lastname' | 'zipcode'): Promise<boolean> {
        const errorMessageText = await this.errorMessage().textContent();
    
        switch (code) {
            case 'firstname':
                await expect(errorMessageText).toBe('Error: First Name is required');
                return errorMessageText === 'Error: First Name is required';
            case 'lastname':
                await expect(errorMessageText).toBe('Error: Last Name is required');
                return errorMessageText === 'Error: Last Name is required';
            case 'zipcode':
                await expect(errorMessageText).toBe('Error: Postal Code is required');
                return errorMessageText === 'Error: Postal Code is required';
            default:
                throw new Error('Invalid error code');
        }
    }
    
    
}   
