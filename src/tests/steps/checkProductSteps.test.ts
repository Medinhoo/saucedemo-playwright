import { test } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import ProductsPage from '../../pages/ProductsPage';
import { validLoginData, productsDetails as products, Product } from '../../utils/data';
import ProductItemPage from '../../pages/ProductItemPage';

test.setTimeout(60 * 1000); // Because of performance_glitch_user

test.describe('Check products details on the products page and product item page with different valid users', () => {

    // Iterate over each user from the valid login data
    validLoginData.forEach(({ username, password }) => {

        // Test case: Verify product details (title, description, and price) on the products page
        test(`${username} Verifies products title, description, and price consistency on productsPage`, 
        async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productsPage = new ProductsPage(page);

            // Log in
            await loginPage.goto();
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.login();

            // Ensure the products page is displayed
            await productsPage.isProductsPageDisplayed();

            // Verify each product's details on the products page
            for (const product of products) {
                await productsPage.isProductCorrect(product);
            }
        });

        // Test case: Verify product details on the product item page by navigating via the product name
        test(`${username} Verifies products title, description, and price consistency on the productItemPage via the product name`, 
        async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productsPage = new ProductsPage(page);
            const productItemPage = new ProductItemPage(page);

            // Log in
            await loginPage.goto();
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.login();

            // Ensure the products page is displayed
            await productsPage.isProductsPageDisplayed();

            // Verify each product's details by navigating via the product name
            for (const product of products) {
                // Navigate to the product detail page via the product title
                await productsPage.displayProductViaTitle(product.idItem);
                await productItemPage.isProductItemPageDisplayed(product.idItem);
                await productItemPage.isProductCorrect(product);

                // Go back to the products page
                await productItemPage.backToProducts();
                await productsPage.isProductsPageDisplayed();

                // Navigate to the product detail page via the product image
                await productsPage.displayProductViaImage(product.idItem);
                await productItemPage.isProductItemPageDisplayed(product.idItem);
                await productItemPage.isProductCorrect(product);

                // Go back to the products page
                await productItemPage.backToProducts();
                await productsPage.isProductsPageDisplayed();
            }
        });

        // Test case: Verify product details on the product item page by navigating via the product image
        test(`${username} Verifies products title, description, and price consistency on the productItemPage via the product image`, 
        async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productsPage = new ProductsPage(page);
            const productItemPage = new ProductItemPage(page);

            // Log in
            await loginPage.goto();
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.login();

            // Ensure the products page is displayed
            await productsPage.isProductsPageDisplayed();

            // Verify each product's details by navigating via the product image
            for (const product of products) {
                // Navigate to the product detail page via the product image
                await productsPage.displayProductViaImage(product.idItem);
                await productItemPage.isProductItemPageDisplayed(product.idItem);
                await productItemPage.isProductCorrect(product);

                // Go back to the products page
                await productItemPage.backToProducts();
                await productsPage.isProductsPageDisplayed();
            }
        });
        
    });
});
