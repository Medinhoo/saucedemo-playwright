import { expect, test } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import ProductsPage from '../../pages/ProductsPage';
import CartPage from '../../pages/CartPage';
import CheckoutInfoPage from '../../pages/CheckoutInfoPage';
import { validLoginData, productsNames as products } from '../../utils/data';
import CheckoutOverviewPage from '../../pages/CheckoutOverviewPage';
import CheckoutCompletePage from '../../pages/CheckoutCompletePage';

test.describe('Order products for different valid users', () => {

  validLoginData.forEach(({ username, password, firstname, lastname, zipcode }) => {
    
    test(`Verify error message on checkout page for missing firstname for ${username}`, 
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page)
        const checkoutInfoPage = new CheckoutInfoPage(page);

        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        await productsPage.isProductsPageDisplayed();
        await productsPage.addToCart(products[0]);
        await productsPage.addToCart(products[1]);
        await productsPage.viewCart();
        await cartPage.isCartPageDisplayed();
        await cartPage.checkout();

        await checkoutInfoPage.isCheckoutInfoPageDisplayed();

        await checkoutInfoPage.enterLastname(lastname);
        await checkoutInfoPage.enterZipcode(zipcode);
        await checkoutInfoPage.clickContinue();

        expect(await checkoutInfoPage.isErrorMessageDisplayed('firstname')).toBe(true);
      }
    );

    test(`Verify error message on checkout page for missing lastname for ${username}`, 
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page)
        const checkoutInfoPage = new CheckoutInfoPage(page);

        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        await productsPage.isProductsPageDisplayed();
        await productsPage.addToCart(products[0]); 
        await productsPage.addToCart(products[1]);
        await productsPage.viewCart();
        await cartPage.isCartPageDisplayed();
        await cartPage.checkout();

        await checkoutInfoPage.enterFirstname(firstname);
        await checkoutInfoPage.enterZipcode(zipcode);
        await checkoutInfoPage.clickContinue();

        expect(await checkoutInfoPage.isErrorMessageDisplayed('lastname')).toBe(true);
      }
    );

    test(`Verify error message on checkout page for missing zipcode for ${username}`, 
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page)
        const checkoutInfoPage = new CheckoutInfoPage(page);

        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        await productsPage.isProductsPageDisplayed();
        await productsPage.addToCart(products[0]);
        await productsPage.addToCart(products[1]);
        await productsPage.viewCart();
        await cartPage.isCartPageDisplayed();
        await cartPage.checkout();

        await checkoutInfoPage.enterFirstname(firstname);
        await checkoutInfoPage.enterLastname(lastname);
        await checkoutInfoPage.clickContinue();

        expect(await checkoutInfoPage.isErrorMessageDisplayed('zipcode')).toBe(true);
      }
    );

    test(`Verify if total price is correct for ${username}`, 
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutInfoPage = new CheckoutInfoPage(page);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);

        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        await productsPage.isProductsPageDisplayed();
        await productsPage.addToCart(products[0]);  
        await productsPage.addToCart(products[1]);
        await productsPage.viewCart();
        await cartPage.isCartPageDisplayed();
        await cartPage.checkout();

        await checkoutInfoPage.enterFirstname(firstname);
        await checkoutInfoPage.enterLastname(lastname);
        await checkoutInfoPage.enterZipcode(zipcode);
        await checkoutInfoPage.clickContinue();

        await checkoutOverviewPage.isCheckoutOverviewPageDisplayed()

        await checkoutOverviewPage.isTotalPriceCorrect()
      }
    );

    test(`Verify if the order is complete for ${username}`, 
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutInfoPage = new CheckoutInfoPage(page);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);

        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        await productsPage.isProductsPageDisplayed();
        await productsPage.addToCart(products[0]); 
        await productsPage.addToCart(products[1]);  
        await productsPage.viewCart();
        await cartPage.isCartPageDisplayed();
        await cartPage.checkout();

        await checkoutInfoPage.enterFirstname(firstname);
        await checkoutInfoPage.enterLastname(lastname);
        await checkoutInfoPage.enterZipcode(zipcode);
        await checkoutInfoPage.clickContinue();

        await checkoutOverviewPage.isCheckoutOverviewPageDisplayed()
        await checkoutOverviewPage.finishOrder();

        await checkoutCompletePage.isCheckoutCompletePageDisplayed()
        await checkoutCompletePage.isOrderComplete()

        await checkoutCompletePage.backToHome()
        await productsPage.isProductsPageDisplayed()
      }
    );

  });
});
