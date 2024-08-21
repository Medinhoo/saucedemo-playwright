import { expect, Page } from "@playwright/test";

export default class CheckoutCompletePage {

    page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators
    private titleCheckoutComplete = () => this.page.getByText('Checkout: Complete!');  // Locator for the page title
    private containerCheckoutComplete = () => this.page.locator('[data-test="checkout-complete-container"]');  // Locator for the main container
    private greetingMessage = () => this.page.locator('[data-test="complete-header"]');  // Locator for the completion message
    private backToProductsButton = () => this.page.locator('[data-test="back-to-products"]');  // Locator for the button to return to products

    // Actions

    // Check if the checkout complete page is displayed
    public async isCheckoutCompletePageDisplayed() {
        await this.page.waitForURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(this.titleCheckoutComplete()).toBeVisible();    
        await expect(this.containerCheckoutComplete()).toBeVisible();    
    }

    // Verify that the order completion message is correct
    public async isOrderComplete() {
        const message = await this.greetingMessage().textContent();   
        expect(message).toEqual('Thank you for your order!');
    }

    // Click the button to return to the products page
    public async backToHome() {
        await this.backToProductsButton().click();
    }
}
