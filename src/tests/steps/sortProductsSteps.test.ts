import { test } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import ProductsPage from '../../pages/ProductsPage';
import { validLoginData, productsNames as products } from '../../utils/data';

test.describe('Sort the products on the products page with different valid users', () => {

  validLoginData.forEach(({ username, password }) => {
    test(`${username} sorts products by price (high to low)`, 
      async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);

      await loginPage.goto();
      await loginPage.enterUsername(username);
      await loginPage.enterPassword(password);
      await loginPage.login();

      await productsPage.isProductsPageDisplayed();

      await productsPage.isSortedByHL()

      }
    );

    test(`${username} sorts products by price (low to high)`, 
      async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);

      await loginPage.goto();
      await loginPage.enterUsername(username);
      await loginPage.enterPassword(password);
      await loginPage.login();

      await productsPage.isProductsPageDisplayed();

      await productsPage.isSortedByLH()

      }
    );

    test(`${username} sorts products by name (Z to A)`, 
      async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);

      await loginPage.goto();
      await loginPage.enterUsername(username);
      await loginPage.enterPassword(password);
      await loginPage.login();

      await productsPage.isProductsPageDisplayed();

      await productsPage.isSortedByZA()

      }
    );

    test(`${username} sorts products by name (A to Z)`, 
      async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);

      await loginPage.goto();
      await loginPage.enterUsername(username);
      await loginPage.enterPassword(password);
      await loginPage.login();

      await productsPage.isProductsPageDisplayed();

      await productsPage.isSortedByAZ()

      }
    );

  });
});
