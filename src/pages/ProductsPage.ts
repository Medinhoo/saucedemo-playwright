import { expect, Page } from "@playwright/test";
import { Product } from "../utils/data";

export default class ProductsPage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private inventoryList = () => this.page.locator('[data-test="inventory-list"]');
    private addToCartButton = (product: string) => this.page.locator(`button[data-test="add-to-cart-${product}"]`);
    private removeFromCartButton = (product: string) => this.page.locator(`button[data-test="remove-${product}"]`);
    private cartIconAmount = () => this.page.locator('[data-test="shopping-cart-badge"]'); 
    private cartIcon = () => this.page.locator('[data-test="shopping-cart-link"]'); 
    private sortingSelect = () => this.page.locator('[data-test="product-sort-container"]')
    private productPrices = () => this.page.locator('[data-test="inventory-item-price"]');
    private productNames = () => this.page.locator('[data-test="inventory-item-name"]');
    private singleProductDetailsContainer = (idItem: number) => this.page.locator(`a[data-test="item-${idItem}-title-link"]`).locator('xpath=ancestor::div[contains(@class, "inventory_item_description")]');
    private productImage = (idItem: number) => this.page.locator(`[data-test="item-${idItem}-img-link"]`);

    // Actions
    public async isProductsPageDisplayed() {
        await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
        await expect(this.inventoryList()).toBeVisible();
    }

    public async addToCart(product: string){
        await this.addToCartButton(product).click();
    }

    public async removeFromCart(product: string){
        await this.removeFromCartButton(product).click();
    }

    public async isRemoveButtonVisible(product: string): Promise<boolean> {
        const btn = this.removeFromCartButton(product);
        return await btn.isVisible();
    }
    

    public async getCartIconAmount(expected: boolean): Promise<number> {
        if (expected) {
            const amountText = await this.cartIconAmount().textContent() as string
            return Number(amountText.trim());       
        } else {
            expect(this.cartIconAmount()).not.toBeVisible()
            return 0
        }
    }

    public async isCartChanged(increased: boolean, prevAmountInCart: number, amountInCart: number) {
        increased 
        ? expect(amountInCart).toBe(prevAmountInCart + 1) 
        : expect(amountInCart).toBe(prevAmountInCart - 1) 
    }

    public async viewCart(){
        await this.cartIcon().click();
    }
    
    public async isSortedByHL(){
        await this.sortingSelect().selectOption({ value: 'hilo' })
        const stringPrices = await this.productPrices().allTextContents();
        const floatPrices = stringPrices.map(p => parseFloat(p.substring(1)))

        const descending = floatPrices.every((price, index) => index === 0 || floatPrices[index - 1] >= price);
        expect(descending).toBe(true)
    }

    public async isSortedByLH(){
        await this.sortingSelect().selectOption('lohi')
        const stringPrices = await this.productPrices().allTextContents();
        const floatPrices = stringPrices.map(p => parseFloat(p.substring(1)))

        const descending = floatPrices.every((price, index) => index === 0 || floatPrices[index - 1] <= price);
        expect(descending).toBe(true)
    }

    public async isSortedByZA(){
        await this.sortingSelect().selectOption('za')
        const names = await this.productNames().allTextContents();

        const descending = names.every((name, index) => index === 0 || names[index - 1] >= name);
        expect(descending).toBe(true)
    }

    public async isSortedByAZ(){
        await this.sortingSelect().selectOption('az')
        const names = await this.productNames().allTextContents();

        const ascending = names.every((name, index) => index === 0 || names[index - 1] <= name);
        expect(ascending).toBe(true)
    }

    public async isProductCorrect(product: Product){
        const idItem = product.idItem
        const productContainer = this.singleProductDetailsContainer(idItem)
        const name = await productContainer.locator('[data-test="inventory-item-name"]').textContent();
        const description = await productContainer.locator('[data-test="inventory-item-desc"]').textContent();
        const price = await productContainer.locator('[data-test="inventory-item-price"]').textContent();

        const testedProduct = {name, description, price, idItem}

        expect(testedProduct).toEqual(product)
    }

    public async displayProductViaTitle(id: number) {
        this.singleProductDetailsContainer(id).locator(`a[data-test="item-${id}-title-link"]`).click()
    }

    public async displayProductViaImage(id: number) {
        this.productImage(id).click()
    }

}
