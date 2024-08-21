import { expect, Page } from "@playwright/test";

export default class CheckoutOverviewPage {

    page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators
    private titleCheckoutOverview = () => this.page.getByText('Checkout: Overview');  // Locator for the checkout overview page title
    private itemOrderedPrice = () => this.page.locator('[data-test="inventory-item-price"]');  // Locator for item prices
    private totalItemPrice = () => this.page.locator('[data-test="subtotal-label"]');  // Locator for the total price label
    private finishOrderButton = () => this.page.locator('[data-test="finish"]');  // Locator for the finish order button
    private taxPrice = () => this.page.locator('[data-test="tax-label"]');  // Locator for the tax price
    private totalOrderPrice = () => this.page.locator('[data-test="total-label"]');  // Locator for the total price of the order including the tax price

    // Actions

    // Check if the checkout overview page is displayed
    public async isCheckoutOverviewPageDisplayed() {
        await this.page.waitForURL('https://www.saucedemo.com/checkout-step-two.html');
        await expect(this.titleCheckoutOverview()).toBeVisible();    
    }

    // Verify if the total price matches the sum of individual item prices
    public async isTotalPriceCorrect() {
        // Get all item prices as text and convert to numbers
        const stringItemPrices = await this.itemOrderedPrice().allTextContents();
        const itemPrices = stringItemPrices.map(p => parseFloat(p.substring(1)));

        // Calculate expected total price
        const expectedTotalItem = itemPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        // Extract and parse displayed total price
        const stringDisplayedTotalItemPrice = await this.totalItemPrice().textContent() as string;
        const floatDisplayedTotalItemPrice = parseFloat(stringDisplayedTotalItemPrice?.substring('Item total: $'.length));

        // Assert that the calculated total price matches the displayed total price
        expect(expectedTotalItem).toEqual(floatDisplayedTotalItemPrice);

        // Extract and parse tax price
        const stringTaxPrice = await this.taxPrice().textContent() as string;
        const floatTaxPrice = parseFloat(stringTaxPrice?.substring('Tax: $'.length));

        // Extract and parse displayed total order price
        const stringDisplayedTotalOrderPrice = await this.totalOrderPrice().textContent() as string;
        const floatDisplayedTotalOrderPrice = parseFloat(stringDisplayedTotalOrderPrice?.substring('Total: $'.length));

        const expectedTotalOrderPrice = expectedTotalItem + floatTaxPrice

        // Assert that the calculated total order price matches the displayed total order price
        expect(expectedTotalOrderPrice).toEqual(floatDisplayedTotalOrderPrice);
    }

    // Click the finish order button
    public async finishOrder() {
        await this.finishOrderButton().click();
    }
}
