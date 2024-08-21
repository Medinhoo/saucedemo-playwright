import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import ProductsPage from '../../pages/ProductsPage';
import CartPage from '../../pages/CartPage';
import { loginData } from '../../utils/data';

test.describe('Login and Logout to Swag Labs', () => {
  // Iterate over each set of login data
  loginData.forEach(({ username, password, result }) => {
    test(`Login test for user: ${username} with password: ${password}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      const cartPage = new CartPage(page);

      // Navigate to the login page
      await loginPage.goto();

      // Enter username and password
      await loginPage.enterUsername(username);
      await loginPage.enterPassword(password);

      // Perform login action
      await loginPage.login();

      // Verify the result based on the expected outcome
      switch (result) {
        case 'products':
          // Check if the products page is displayed
          await productsPage.isProductsPageDisplayed();

          // Perform logout
          await productsPage.clickMenuButton();
          await productsPage.clickLogoutButton();

          // Verify the user is redirected to the login page after logout
          await loginPage.isLoginPageDisplayed();
          break;

        case 'locked_out':
          // Verify error message for locked-out user
          await loginPage.isErrorMessageVisible();
          await loginPage.errorMessageContains("Epic sadface: Sorry, this user has been locked out.");

          // No logout action needed for locked-out scenario
          break;

        case 'wrong_credentials':
          // Verify error message for wrong credentials
          await loginPage.isErrorMessageVisible();
          await loginPage.errorMessageContains("Epic sadface: Username and password do not match any user in this service");

          // No logout action needed for wrong credentials scenario
          break;

        case 'username_required':
          // Verify error message for missing username
          await loginPage.isErrorMessageVisible();
          await loginPage.errorMessageContains("Epic sadface: Username is required");

          // No logout action needed for missing username scenario
          break;

        case 'password_required':
          // Verify error message for missing password
          await loginPage.isErrorMessageVisible();
          await loginPage.errorMessageContains("Epic sadface: Password is required");

          // No logout action needed for missing password scenario
          break;

        default:
          // Throw an error for unexpected result
          throw new Error(`Unexpected result: ${result}`);
      }
    });
  });
});
