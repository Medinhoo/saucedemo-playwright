import { test } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import ProductsPage from '../../pages/ProductsPage';
import { validLoginData, productsDetails as products, Product } from '../../utils/data';
import ProductItemPage from '../../pages/ProductItemPage';

test.describe('Check products details on the products page and product item page with different valid users', () => {

    validLoginData.forEach(({ username, password }) => {
        test(`${username} Verifies products title, description, and price consistency on productsPage`, 
        async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productsPage = new ProductsPage(page);

            await loginPage.goto();
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.login();

            await productsPage.isProductsPageDisplayed();

            for (const product of products) await productsPage.isProductCorrect(product)

        });

        test(`${username} Verifies products title, description, and price consistency on the productItemPage via the product name`, 
            async ({ page }) => {
                const loginPage = new LoginPage(page);
                const productsPage = new ProductsPage(page);
                const productItemPage = new ProductItemPage(page);
        
                // Login
                await loginPage.goto();
                await loginPage.enterUsername(username);
                await loginPage.enterPassword(password);
                await loginPage.login();
        
                // Check that the products page is displayed
                await productsPage.isProductsPageDisplayed();
        
                for (const product of products) {
                    // Display the product via title
                    await productsPage.displayProductViaTitle(product.idItem);
                    await productItemPage.isProductItemPageDisplayed(product.idItem);
                    await productItemPage.isProductCorrect(product);
                    
                    // Go back to the products page
                    await productItemPage.backToProducts();
                    await productsPage.isProductsPageDisplayed();
        
                    // Display the product via image
                    await productsPage.displayProductViaImage(product.idItem);
                    await productItemPage.isProductItemPageDisplayed(product.idItem);
                    await productItemPage.isProductCorrect(product);
                    
                    // Go back to the products page
                    await productItemPage.backToProducts();
                    await productsPage.isProductsPageDisplayed();
                }
        
            });

        test(`${username} Verifies products title, description, and price consistency on the productItemPage via the product image`, 
            async ({ page }) => {
                const loginPage = new LoginPage(page);
                const productsPage = new ProductsPage(page);
                const productItemPage = new ProductItemPage(page);
        
                // Login
                await loginPage.goto();
                await loginPage.enterUsername(username);
                await loginPage.enterPassword(password);
                await loginPage.login();
        
                // Check that the products page is displayed
                await productsPage.isProductsPageDisplayed();
        
                for (const product of products) {
                    
                    // Display the product via image
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