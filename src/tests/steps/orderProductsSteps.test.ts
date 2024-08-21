import { expect, test } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import ProductsPage from '../../pages/ProductsPage';
import CartPage from '../../pages/CartPage';
import CheckoutInfoPage from '../../pages/CheckoutInfoPage';
import { validLoginData, productsNames as products } from '../../utils/data';
import CheckoutOverviewPage from '../../pages/CheckoutOverviewPage';
import CheckoutCompletePage from '../../pages/CheckoutCompletePage';

test.describe('Order products for different valid users', () => {

  // Iterate over each user with valid login data
  validLoginData.forEach(({ username, password, firstname, lastname, zipcode }) => {
    
    // Test for verifying error message when firstname is missing
    test(`Verify error message on checkout page for missing firstname for ${username}`, 
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutInfoPage = new CheckoutInfoPage(page);

        // Login to the application
        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        // Navigate to the products page and add products to the cart
        await productsPage.isProductsPageDisplayed();
        await productsPage.addToCart(products[0]);
        await productsPage.addToCart(products[1]);
        await productsPage.viewCart();
        
        // Proceed to checkout from the cart page
        await cartPage.isCartPageDisplayed();
        await cartPage.checkout();

        // Ensure the checkout info page is displayed
        await checkoutInfoPage.isCheckoutInfoPageDisplayed();

        // Attempt checkout with missing firstname
        await checkoutInfoPage.enterLastname(lastname);
        await checkoutInfoPage.enterZipcode(zipcode);
        await checkoutInfoPage.clickContinue();

        // Verify that an error message for missing firstname is displayed
        expect(await checkoutInfoPage.isErrorMessageDisplayed('firstname')).toBe(true);
      }
    );

    // Test for verifying error message when lastname is missing
    test(`Verify error message on checkout page for missing lastname for ${username}`, 
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutInfoPage = new CheckoutInfoPage(page);

        // Login to the application
        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        // Navigate to the products page and add products to the cart
        await productsPage.isProductsPageDisplayed();
        await productsPage.addToCart(products[0]); 
        await productsPage.addToCart(products[1]);
        await productsPage.viewCart();
        
        // Proceed to checkout from the cart page
        await cartPage.isCartPageDisplayed();
        await cartPage.checkout();

        // Ensure the checkout info page is displayed
        await checkoutInfoPage.isCheckoutInfoPageDisplayed();

        // Attempt checkout with missing lastname
        await checkoutInfoPage.enterFirstname(firstname);
        await checkoutInfoPage.enterZipcode(zipcode);
        await checkoutInfoPage.clickContinue();

        // Verify that an error message for missing lastname is displayed
        expect(await checkoutInfoPage.isErrorMessageDisplayed('lastname')).toBe(true);
      }
    );

    // Test for verifying error message when zipcode is missing
    test(`Verify error message on checkout page for missing zipcode for ${username}`, 
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutInfoPage = new CheckoutInfoPage(page);

        // Login to the application
        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        // Navigate to the products page and add products to the cart
        await productsPage.isProductsPageDisplayed();
        await productsPage.addToCart(products[0]);
        await productsPage.addToCart(products[1]);
        await productsPage.viewCart();
        
        // Proceed to checkout from the cart page
        await cartPage.isCartPageDisplayed();
        await cartPage.checkout();

        // Ensure the checkout info page is displayed
        await checkoutInfoPage.isCheckoutInfoPageDisplayed();

        // Attempt checkout with missing zipcode
        await checkoutInfoPage.enterFirstname(firstname);
        await checkoutInfoPage.enterLastname(lastname);
        await checkoutInfoPage.clickContinue();

        // Verify that an error message for missing zipcode is displayed
        expect(await checkoutInfoPage.isErrorMessageDisplayed('zipcode')).toBe(true);
      }
    );

    // Test for verifying if the total price is correct
    test(`Verify if total price is correct for ${username}`, 
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutInfoPage = new CheckoutInfoPage(page);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);

        // Login to the application
        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        // Navigate to the products page and add products to the cart
        await productsPage.isProductsPageDisplayed();
        await productsPage.addToCart(products[0]);  
        await productsPage.addToCart(products[1]);
        await productsPage.viewCart();
        
        // Proceed to checkout from the cart page
        await cartPage.isCartPageDisplayed();
        await cartPage.checkout();

        // Fill out the checkout information and proceed
        await checkoutInfoPage.enterFirstname(firstname);
        await checkoutInfoPage.enterLastname(lastname);
        await checkoutInfoPage.enterZipcode(zipcode);
        await checkoutInfoPage.clickContinue();

        // Verify that the checkout overview page is displayed
        await checkoutOverviewPage.isCheckoutOverviewPageDisplayed();

        // Check if the total price displayed is correct
        await checkoutOverviewPage.isTotalPriceCorrect();
      }
    );

    // Test for verifying if the order completion is successful
    test(`Verify if the order is complete for ${username}`, 
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutInfoPage = new CheckoutInfoPage(page);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);

        // Login to the application
        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        // Navigate to the products page and add products to the cart
        await productsPage.isProductsPageDisplayed();
        await productsPage.addToCart(products[0]); 
        await productsPage.addToCart(products[1]);  
        await productsPage.viewCart();
        
        // Proceed to checkout from the cart page
        await cartPage.isCartPageDisplayed();
        await cartPage.checkout();

        // Fill out the checkout information and proceed
        await checkoutInfoPage.enterFirstname(firstname);
        await checkoutInfoPage.enterLastname(lastname);
        await checkoutInfoPage.enterZipcode(zipcode);
        await checkoutInfoPage.clickContinue();

        // Verify that the checkout overview page is displayed and complete the order
        await checkoutOverviewPage.isCheckoutOverviewPageDisplayed();
        await checkoutOverviewPage.finishOrder();

        // Verify that the checkout complete page is displayed and the order is confirmed
        await checkoutCompletePage.isCheckoutCompletePageDisplayed();
        await checkoutCompletePage.isOrderComplete();

        // Navigate back to the home page and verify the products page is displayed
        await checkoutCompletePage.backToHome();
        await productsPage.isProductsPageDisplayed();
      }
    );

  });
});
