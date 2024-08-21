import { test } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import ProductsPage from '../../pages/ProductsPage';
import { validLoginData, productsNames as products } from '../../utils/data';

test.describe('Sort the products on the products page with different valid users', () => {

  // Iterate over each user from the valid login data
  validLoginData.forEach(({ username, password }) => {

    // Test case: Sort products by price from high to low
    test(`${username} sorts products by price (high to low)`, 
      async ({ page }) => {
        // Create instances of page objects
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        // Navigate to the login page and perform login
        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        // Ensure the products page is displayed after login
        await productsPage.isProductsPageDisplayed();

        // Verify that products are sorted by price from high to low
        await productsPage.isSortedByHL();
      }
    );

    // Test case: Sort products by price from low to high
    test(`${username} sorts products by price (low to high)`, 
      async ({ page }) => {
        // Create instances of page objects
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        // Navigate to the login page and perform login
        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        // Ensure the products page is displayed after login
        await productsPage.isProductsPageDisplayed();

        // Verify that products are sorted by price from low to high
        await productsPage.isSortedByLH();
      }
    );

    // Test case: Sort products by name from Z to A
    test(`${username} sorts products by name (Z to A)`, 
      async ({ page }) => {
        // Create instances of page objects
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        // Navigate to the login page and perform login
        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        // Ensure the products page is displayed after login
        await productsPage.isProductsPageDisplayed();

        // Verify that products are sorted by name from Z to A
        await productsPage.isSortedByZA();
      }
    );

    // Test case: Sort products by name from A to Z
    test(`${username} sorts products by name (A to Z)`, 
      async ({ page }) => {
        // Create instances of page objects
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        // Navigate to the login page and perform login
        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        // Ensure the products page is displayed after login
        await productsPage.isProductsPageDisplayed();

        // Verify that products are sorted by name from A to Z
        await productsPage.isSortedByAZ();
      }
    );
    
  });
});
