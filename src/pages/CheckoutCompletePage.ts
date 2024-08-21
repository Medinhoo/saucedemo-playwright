import { expect, Page } from "@playwright/test";

export default class CheckoutCompletePage {

    page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators 
    private titleCheckoutComplete= () => this.page.getByText('Checkout: Complete!');
    private containerCheckoutComplete= () => this.page.locator('[data-test="checkout-complete-container"]');
    private greatingMessage = () => this.page.locator('[data-test="complete-header"]');
    private backToProductsButton = () => this.page.locator('[data-test="back-to-products"]');

    // Actions
    public async isCheckoutCompletePageDisplayed() {
        await this.page.waitForURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(this.titleCheckoutComplete()).toBeVisible();    
        await expect(this.containerCheckoutComplete()).toBeVisible();    
    }

    public async isOrderComplete() {
        const mess = await this.greatingMessage().textContent()   
        expect(mess).toEqual('Thank you for your order!')
    }

    public async backToHome() {
        await this.backToProductsButton().click()
    }



    
    
}   
