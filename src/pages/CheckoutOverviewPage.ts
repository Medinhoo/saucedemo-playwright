import { expect, Page } from "@playwright/test";

export default class CheckoutOverviewPage {

    page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators 
    private titleCheckoutOverview = () => this.page.getByText('Checkout: Overview');
    private itemOrderedPrice = () => this.page.locator('[data-test="inventory-item-price"]');
    private totalItemPrice = () => this.page.locator('[data-test="subtotal-label"]');
    private finishOrderButton = () => this.page.locator('[data-test="finish"]');

    // Actions
    public async isCheckoutOverviewPageDisplayed() {
        await this.page.waitForURL('https://www.saucedemo.com/checkout-step-two.html');
        await expect(this.titleCheckoutOverview()).toBeVisible();    
    }

    public async isTotalPriceCorrect() {
        const stringItemPrices = await this.itemOrderedPrice().allTextContents()
        const itemPrices = stringItemPrices.map(p => parseFloat(p.substring(1)))

        const expectedTotalItem = itemPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        let stringDisplayedTotalItemPrice = await this.totalItemPrice().textContent() as string
        const floatDisplayedTotalItemPrice = parseFloat(stringDisplayedTotalItemPrice?.substring('Item total: $'.length))

        expect(expectedTotalItem).toEqual(floatDisplayedTotalItemPrice) 
    }

    public async finishOrder() {
        await this.finishOrderButton().click()    
    }

    
    
}   
