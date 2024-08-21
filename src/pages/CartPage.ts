import { expect, Page } from "@playwright/test";

export default class CartPage {

    page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators 
    private cartList = () => this.page.locator('[data-test="cart-list"]')
    private cartItem = () => this.page.locator('[data-test="inventory-item"]')
    private removeFromCartButton = (product: string) => this.page.locator(`button[data-test="remove-${product}"]`);
    private continueShoppingButton = () => this.page.locator(`button[data-test="continue-shopping"]`);
    private checkoutButton = () => this.page.locator(`button[data-test="checkout"]`);

    // Actions
    public async isCartPageDisplayed() {
        await this.page.waitForURL('https://www.saucedemo.com/cart.html');
        await expect(this.cartList()).toBeVisible();    
    }

    public async amountProductsInCart() {
        return await this.cartItem().count()
    }

    public async removeProduct(product: string) {
        await this.removeFromCartButton(product).click()
    }

    public async continueShopping() {
        await this.continueShoppingButton().click()
    }

    public async checkout() {
        await this.checkoutButton().click()
    }


    
}   
