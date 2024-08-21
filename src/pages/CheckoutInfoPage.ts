import { expect, Page } from "@playwright/test";

export default class CheckoutInfoPage {

    page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators
    private titleCheckoutInfo = () => this.page.getByText('Checkout: Your Information');  // Locator for the checkout info page title
    private inputFirstname = () => this.page.locator('input[data-test="firstName"]');  // Locator for the first name input field
    private inputLastname = () => this.page.locator('input[data-test="lastName"]');  // Locator for the last name input field
    private inputZipcode = () => this.page.locator('input[data-test="postalCode"]');  // Locator for the zip code input field
    private continueButton = () => this.page.locator('[data-test="continue"]');  // Locator for the continue button
    private errorMessage = () => this.page.locator('[data-test="error"]');  // Locator for the error message

    // Actions

    // Verify the checkout information page is displayed
    public async isCheckoutInfoPageDisplayed() {
        await this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');
        await expect(this.titleCheckoutInfo()).toBeVisible();    
    }

    // Fill in the first name field
    public async enterFirstname(firstname: string) {
        await this.inputFirstname().fill(firstname);
    }

    // Fill in the last name field
    public async enterLastname(lastname: string) {
        await this.inputLastname().fill(lastname);
    }
    
    // Fill in the zip code field
    public async enterZipcode(zipcode: number) {
        await this.inputZipcode().fill(zipcode.toString());
    }

    // Click the continue button to proceed
    public async clickContinue() {
        await this.continueButton().click();
    }

    // Check if the appropriate error message is displayed
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
