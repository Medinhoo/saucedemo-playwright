import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import ProductsPage from '../../pages/ProductsPage';
import { loginData } from '../../utils/data';


test.describe('Login to Swag Labs', () => {
  loginData.forEach(({ username, password, result }) => {
    test(`Login test for user: ${username} with password: ${password}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);

      await loginPage.goto();

      await loginPage.enterUsername(username);
      
      await loginPage.enterPassword(password);
      
      await loginPage.login();

      switch (result) {
        case 'products':
          await productsPage.isProductsPageDisplayed()
          break;

        case 'locked_out':
          await loginPage.isErrorMessageVisible();
          await loginPage.errorMessageContains("Epic sadface: Sorry, this user has been locked out.");
          break;

        case 'wrong_credentials':
          await loginPage.isErrorMessageVisible();
          await loginPage.errorMessageContains("Epic sadface: Username and password do not match any user in this service");
          break;

        case 'username_required':
          await loginPage.isErrorMessageVisible();
          await loginPage.errorMessageContains("Epic sadface: Username is required");
          break;

        case 'password_required':
          await loginPage.isErrorMessageVisible();
          await loginPage.errorMessageContains("Epic sadface: Password is required");
          break;

        default:
          throw new Error(`Unexpected result: ${result}`);
      }
    });
  });
});
