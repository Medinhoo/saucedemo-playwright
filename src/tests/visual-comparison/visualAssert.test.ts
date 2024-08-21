import test, { expect } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import { validLoginData, productsDetails as products, productsNames } from "../../utils/data";
import ProductsPage from "../../pages/ProductsPage";
import ProductItemPage from "../../pages/ProductItemPage";
import CartPage from "../../pages/CartPage";
import CheckoutInfoPage from "../../pages/CheckoutInfoPage";
import CheckoutOverviewPage from "../../pages/CheckoutOverviewPage";
import CheckoutCompletePage from "../../pages/CheckoutCompletePage";


test.describe("Visual assertion and comparison of the saucedemo website", () => {

    validLoginData.forEach(({ username, password }) => {

        test(`Visual comparison of the login page for ${username}`, async ({page}) => {
            const loginPage = new LoginPage(page)
            await loginPage.goto()
            
            // Take a screenshot and compare with snapshot
            expect(await page.screenshot()).toMatchSnapshot('loginPageSnapshot.png')
        }) 

        test(`Visual comparison of the products page for ${username}`, async ({page}) => {
            const loginPage = new LoginPage(page)
            const productsPage = new ProductsPage(page);

            // Log in
            await loginPage.goto();
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.login();

            // Check if products page is displayed
            await productsPage.isProductsPageDisplayed();

            // Take a screenshot and compare with snapshot
            expect(await page.screenshot({fullPage: true})).toMatchSnapshot('productsPageSnapshot.png')
        
        }) 

        test(`Visual comparison of the product item page for ${username}`, async ({ page }) => {
            test.setTimeout(60 * 1000); // Because of performance_glitch_user

            const loginPage = new LoginPage(page);
            const productsPage = new ProductsPage(page);
            const productItemPage = new ProductItemPage(page);
      
            // Log in
            await loginPage.goto();
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.login();
      
            // Check if the products page is displayed
            await productsPage.isProductsPageDisplayed();
      
            for (const product of products) {
              // Display the product page by title
              await productsPage.displayProductViaTitle(product.idItem);
              
              // Ensure product item page is displayed
              await productItemPage.isProductItemPageDisplayed(product.idItem);
      
              // Take a screenshot and compare with snapshot
              const screenshot = await page.screenshot({ fullPage: true });
              expect(screenshot).toMatchSnapshot(`productItem${product.idItem}PageSnapshot.png`);
      
              // Go back to the products page
              await productItemPage.backToProducts();
              await productsPage.isProductsPageDisplayed();
            }
        });

        test(`Visual comparison of the cart page for ${username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productsPage = new ProductsPage(page);
            const cartPage = new CartPage(page);
      
            // Log in
            await loginPage.goto();
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.login();
      
            // Check if the products page is displayed
            await productsPage.isProductsPageDisplayed();
            
            // go to the cart page
            await productsPage.viewCart()

            // Check if the cart page is displayed
            await cartPage.isCartPageDisplayed()

            // Take a screenshot and compare with snapshot
            expect(await page.screenshot({fullPage: true})).toMatchSnapshot('cartPageSnapshot.png')

        });

        test(`Visual comparison of the checkout info page for ${username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productsPage = new ProductsPage(page);
            const cartPage = new CartPage(page);
            const checkoutInfoPage = new CheckoutInfoPage(page);
      
            // Log in
            await loginPage.goto();
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.login();
      
            // Check if the products page is displayed
            await productsPage.isProductsPageDisplayed();
            
            // go to the cart page
            await productsPage.viewCart()

            // Check if the cart page is displayed
            await cartPage.isCartPageDisplayed()

            // go to the checkout info page
            await cartPage.checkout()

            // Check if the checkout info page is displayed
            await checkoutInfoPage.isCheckoutInfoPageDisplayed()

            // Take a screenshot and compare with snapshot
            expect(await page.screenshot({fullPage: true})).toMatchSnapshot('checkoutInfoPageSnapshot.png')

        });

        test(`Visual comparison of the checkout overview page for ${username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productsPage = new ProductsPage(page);
            const cartPage = new CartPage(page);
            const checkoutInfoPage = new CheckoutInfoPage(page);
            const checkoutOverviewPage = new CheckoutOverviewPage(page);
      
            // Log in
            await loginPage.goto();
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.login();
      
            // Check if the products page is displayed
            await productsPage.isProductsPageDisplayed();
      
            // go to the cart page
            await productsPage.viewCart()

            // Check if the cart page is displayed
            await cartPage.isCartPageDisplayed()

            // go to the checkout info page
            await cartPage.checkout()

            // Check if the checkout info page is displayed
            await checkoutInfoPage.isCheckoutInfoPageDisplayed()

            // fill the form to continue on the checkout overview page
            await checkoutInfoPage.enterFirstname('xxx')
            await checkoutInfoPage.enterLastname('xxx')
            await checkoutInfoPage.enterZipcode(123)
            await checkoutInfoPage.clickContinue()

            // Check if the checkout overview page is displayed
            await checkoutOverviewPage.isCheckoutOverviewPageDisplayed()

            // Take a screenshot and compare with snapshot
            expect(await page.screenshot({fullPage: true})).toMatchSnapshot('checkoutOverviewPageSnapshot.png')

        });
        
        test(`Visual comparison of the checkout complete page for ${username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productsPage = new ProductsPage(page);
            const cartPage = new CartPage(page);
            const checkoutInfoPage = new CheckoutInfoPage(page);
            const checkoutOverviewPage = new CheckoutOverviewPage(page);
            const checkoutCompletePage = new CheckoutCompletePage(page);
      
            // Log in
            await loginPage.goto();
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.login();
      
            // Check if the products page is displayed
            await productsPage.isProductsPageDisplayed();

            // add a product to the cart to complete the order
            await productsPage.addToCart(productsNames[0])
      
            // go to the cart page
            await productsPage.viewCart()

            // Check if the cart page is displayed
            await cartPage.isCartPageDisplayed()

            // go to the checkout info page
            await cartPage.checkout()

            // Check if the checkout info page is displayed
            await checkoutInfoPage.isCheckoutInfoPageDisplayed()

            // fill the form to continue on the checkout overview page
            await checkoutInfoPage.enterFirstname('xxx')
            await checkoutInfoPage.enterLastname('xxx')
            await checkoutInfoPage.enterZipcode(123)
            await checkoutInfoPage.clickContinue()

            // Check if the checkout overview page is displayed
            await checkoutOverviewPage.isCheckoutOverviewPageDisplayed()

            // confirm the order
            await checkoutOverviewPage.finishOrder()

            // Check if the checkout complete page is displayed
            await checkoutCompletePage.isCheckoutCompletePageDisplayed()

            // Take a screenshot and compare with snapshot
            expect(await page.screenshot({fullPage: true})).toMatchSnapshot('checkoutCompletePageSnapshot.png')

        });
        
    })

})
