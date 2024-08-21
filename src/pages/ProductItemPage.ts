import { expect, Page } from "@playwright/test";
import { Product } from "../utils/data";

export default class ProductItemPage {

    page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators 
    private productItem = () => this.page.locator('[data-test="inventory-item"]')
    private productItemName = () => this.page.locator('[data-test="inventory-item-name"]')
    private productItemDesc = () => this.page.locator('[data-test="inventory-item-desc"]')
    private productItemPrice = () => this.page.locator('[data-test="inventory-item-price"]')
    private backToProductsButton = () => this.page.locator('[data-test="back-to-products"]')

    // Actions
    public async isProductItemPageDisplayed(id: number) {
        await this.page.waitForURL(`https://www.saucedemo.com/inventory-item.html?id=${id}`);
        await expect(this.productItem()).toBeVisible();    
    }
     
    public async isProductCorrect(product: Product) {
        const idItem = product.idItem
        const name = await this.productItemName().textContent();
        const description = await this.productItemDesc().textContent();
        const price = await  this.productItemPrice().textContent();

        const testedProduct = {name, description, price, idItem}

        expect(testedProduct).toEqual(product)
    }

    public async backToProducts() {
        await this.backToProductsButton().click()
    }
}
