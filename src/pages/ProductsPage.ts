import { expect, Page } from "@playwright/test";
import { Product } from "../utils/data";

export default class ProductsPage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private inventoryList = () => this.page.locator('[data-test="inventory-list"]');
    private menuButton = () => this.page.locator('#react-burger-menu-btn');
    private logoutButton = () => this.page.locator('[data-test="logout-sidebar-link"]');
    private addToCartButton = (product: string) => this.page.locator(`button[data-test="add-to-cart-${product}"]`);
    private removeFromCartButton = (product: string) => this.page.locator(`button[data-test="remove-${product}"]`);
    private cartIconAmount = () => this.page.locator('[data-test="shopping-cart-badge"]'); 
    private cartIcon = () => this.page.locator('[data-test="shopping-cart-link"]'); 
    private sortingSelect = () => this.page.locator('[data-test="product-sort-container"]');
    private productPrices = () => this.page.locator('[data-test="inventory-item-price"]');
    private productNames = () => this.page.locator('[data-test="inventory-item-name"]');
    private singleProductDetailsContainer = (idItem: number) => this.page.locator(`a[data-test="item-${idItem}-title-link"]`).locator('xpath=ancestor::div[contains(@class, "inventory_item_description")]');
    private productImage = (idItem: number) => this.page.locator(`[data-test="item-${idItem}-img-link"]`);

    // Verify that the products page is displayed
    public async isProductsPageDisplayed() {
        await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
        await expect(this.inventoryList()).toBeVisible();
    }

    // Click on the menu button
    public async clickMenuButton() {
        await this.menuButton().click()
    }

    // Click on the logout button
    public async clickLogoutButton() {
        await this.logoutButton().click()

    }

    // Add a product to the cart
    public async addToCart(product: string) {
        await this.addToCartButton(product).click();
    }

    // Remove a product from the cart
    public async removeFromCart(product: string) {
        await this.removeFromCartButton(product).click();
    }

    // Check if the "Remove" button is visible for a product
    public async isRemoveButtonVisible(product: string): Promise<boolean> {
        const btn = this.removeFromCartButton(product);
        return await btn.isVisible();
    }

    // Get the amount displayed on the cart icon
    public async getCartIconAmount(expected: boolean): Promise<number> {
        if (expected) {
            const amountText = await this.cartIconAmount().textContent() as string;
            return Number(amountText.trim());       
        } else {
            expect(this.cartIconAmount()).not.toBeVisible();
            return 0;
        }
    }

    // Verify if the cart amount has increased or decreased
    public async isCartChanged(increased: boolean, prevAmountInCart: number, amountInCart: number) {
        increased 
            ? expect(amountInCart).toBe(prevAmountInCart + 1) 
            : expect(amountInCart).toBe(prevAmountInCart - 1);
    }

    // Click the cart icon to view the cart
    public async viewCart() {
        await this.cartIcon().click();
    }

    // Verify if products are sorted by price from High to Low
    public async isSortedByHL() {
        await this.sortingSelect().selectOption({ value: 'hilo' });
        const stringPrices = await this.productPrices().allTextContents();
        const floatPrices = stringPrices.map(p => parseFloat(p.substring(1)));

        const descending = floatPrices.every((price, index) => index === 0 || floatPrices[index - 1] >= price);
        expect(descending).toBe(true);
    }

    // Verify if products are sorted by price from Low to High
    public async isSortedByLH() {
        await this.sortingSelect().selectOption('lohi');
        const stringPrices = await this.productPrices().allTextContents();
        const floatPrices = stringPrices.map(p => parseFloat(p.substring(1)));

        const descending = floatPrices.every((price, index) => index === 0 || floatPrices[index - 1] <= price);
        expect(descending).toBe(true);
    }

    // Verify if products are sorted by name from Z to A
    public async isSortedByZA() {
        await this.sortingSelect().selectOption('za');
        const names = await this.productNames().allTextContents();

        const descending = names.every((name, index) => index === 0 || names[index - 1] >= name);
        expect(descending).toBe(true);
    }

    // Verify if products are sorted by name from A to Z
    public async isSortedByAZ() {
        await this.sortingSelect().selectOption('az');
        const names = await this.productNames().allTextContents();

        const ascending = names.every((name, index) => index === 0 || names[index - 1] <= name);
        expect(ascending).toBe(true);
    }

    // Check if a product's details are correct
    public async isProductCorrect(product: Product) {
        const idItem = product.idItem;
        const productContainer = this.singleProductDetailsContainer(idItem);
        const name = await productContainer.locator('[data-test="inventory-item-name"]').textContent();
        const description = await productContainer.locator('[data-test="inventory-item-desc"]').textContent();
        const price = await productContainer.locator('[data-test="inventory-item-price"]').textContent();

        const testedProduct = { name, description, price, idItem };

        expect(testedProduct).toEqual(product);
    }

    // Display product details by clicking on the product title
    public async displayProductViaTitle(id: number) {
        this.singleProductDetailsContainer(id).locator(`a[data-test="item-${id}-title-link"]`).click();
    }

    // Display product details by clicking on the product image
    public async displayProductViaImage(id: number) {
        this.productImage(id).click();
    }

}
