import { expect, Page } from "@playwright/test";
import { Product } from "../utils/data";

export default class ProductItemPage {

    page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators
    private productItem = () => this.page.locator('[data-test="inventory-item"]');  // Locator for the entire product item
    private productItemName = () => this.page.locator('[data-test="inventory-item-name"]');  // Locator for the product name
    private productItemDesc = () => this.page.locator('[data-test="inventory-item-desc"]');  // Locator for the product description
    private productItemPrice = () => this.page.locator('[data-test="inventory-item-price"]');  // Locator for the product price
    private backToProductsButton = () => this.page.locator('[data-test="back-to-products"]');  // Locator for the "Back to Products" button

    // Actions

    // Verify that the product item page is displayed
    public async isProductItemPageDisplayed(id: number) {
        await this.page.waitForURL(`https://www.saucedemo.com/inventory-item.html?id=${id}`);
        await expect(this.productItem()).toBeVisible();    
    }

    // Verify that the displayed product matches the expected product data
    public async isProductCorrect(product: Product) {
        const idItem = product.idItem;
        const name = await this.productItemName().textContent();
        const description = await this.productItemDesc().textContent();
        const price = await this.productItemPrice().textContent();

        const testedProduct = { name, description, price, idItem };

        expect(testedProduct).toEqual(product);
    }

    // Navigate back to the products page
    public async backToProducts() {
        await this.backToProductsButton().click();
    }
}
