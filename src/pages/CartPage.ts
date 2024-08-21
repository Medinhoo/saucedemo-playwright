import { expect, Page } from "@playwright/test";

export default class CartPage {

    page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators 
    private cartList = () => this.page.locator('[data-test="cart-list"]');  // Locator for the cart list
    private cartItem = () => this.page.locator('[data-test="inventory-item"]');  // Locator for individual items in the cart
    private removeFromCartButton = (product: string) => this.page.locator(`button[data-test="remove-${product}"]`);  // Locator for remove button of a specific product
    private continueShoppingButton = () => this.page.locator('button[data-test="continue-shopping"]');  // Locator for "Continue Shopping" button
    private checkoutButton = () => this.page.locator('button[data-test="checkout"]');  // Locator for "Checkout" button

    // Actions

    // Verify that the cart page is displayed
    public async isCartPageDisplayed() {
        await this.page.waitForURL('https://www.saucedemo.com/cart.html');
        await expect(this.cartList()).toBeVisible();    
    }

    // Get the number of products in the cart
    public async amountProductsInCart() {
        return await this.cartItem().count();
    }

    // Remove a specific product from the cart
    public async removeProduct(product: string) {
        await this.removeFromCartButton(product).click();
    }

    // Click the "Continue Shopping" button
    public async continueShopping() {
        await this.continueShoppingButton().click();
    }

    // Click the "Checkout" button
    public async checkout() {
        await this.checkoutButton().click();
    }
}
