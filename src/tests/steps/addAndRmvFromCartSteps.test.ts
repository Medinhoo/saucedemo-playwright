import { expect, test } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import ProductsPage from '../../pages/ProductsPage';
import CartPage from '../../pages/CartPage'
import { validLoginData, productsNames as products } from '../../utils/data';

test.describe('Add and remove product(s) from the cart for different valid users', () => {

  validLoginData.forEach(({ username, password }) => {
    test(`Add and remove a single product from the cart via the product page for ${username}`, 
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const product = products[0]
        let increasing: boolean = true
        let expected: boolean = true

        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        await productsPage.isProductsPageDisplayed();

        await productsPage.addToCart(product);

        let amountInCart = await productsPage.getCartIconAmount(expected);
        await productsPage.isCartChanged(increasing, 0, amountInCart);
        
        await productsPage.removeFromCart(product)
        amountInCart = await productsPage.getCartIconAmount(!expected);
        await productsPage.isCartChanged(!increasing, 1, amountInCart);
        expect(await productsPage.isRemoveButtonVisible(product)).toBe(false)

      }
    );

    test(`Add and remove 6 products from the cart via the product page for ${username}`, 
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        let increasing: boolean = true
        let expected: boolean = true

        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        await productsPage.isProductsPageDisplayed();
        
        for (let product of products){
          let prevAmountInCart: number

          if (product !== products[0]) {
            prevAmountInCart = await productsPage.getCartIconAmount(expected);
          } else {
            prevAmountInCart = await productsPage.getCartIconAmount(!expected);
          }
    
          await productsPage.addToCart(product);
    
          const amountInCart = await productsPage.getCartIconAmount(expected);
          await productsPage.isCartChanged(increasing, prevAmountInCart, amountInCart); 
        }
        
        for (let product of products){
          let amountInCart: number

          const prevAmountInCart = await productsPage.getCartIconAmount(expected);

          await productsPage.removeFromCart(product)

          if (product !== products[products.length - 1]) {
            amountInCart = await productsPage.getCartIconAmount(expected);
          } else {
            amountInCart = await productsPage.getCartIconAmount(!expected);
          }
          
          await productsPage.isCartChanged(!increasing, prevAmountInCart, amountInCart);
          expect(await productsPage.isRemoveButtonVisible(product)).toBe(false)
        } 
      }
    );

    test(`Add and remove a single product from the cart via the cart page and verify changes on both the cart page and the products page for ${username}`, 
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const product = products[0]

        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();

        await productsPage.isProductsPageDisplayed();

        await productsPage.addToCart(product);
        await productsPage.viewCart()

        await cartPage.isCartPageDisplayed()
        expect(await cartPage.amountProductsInCart()).toBe(1)
        
        await cartPage.removeProduct(product)
        expect(await cartPage.amountProductsInCart()).toBe(0)

        await cartPage.continueShopping()
        await productsPage.isProductsPageDisplayed();

        expect(await productsPage.isRemoveButtonVisible(product)).toBe(false)

      }
    );

    test(`Add and remove 6 products via the cart page and verify changes on both the cart page and the products page for ${username}`, 
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
    
        await loginPage.goto();
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.login();
    
        await productsPage.isProductsPageDisplayed();
    
        for (const product of products) {
          await productsPage.addToCart(product);
        }
    
        await productsPage.viewCart();
        await cartPage.isCartPageDisplayed();
        expect(await cartPage.amountProductsInCart()).toBe(products.length);
    
        for (const product of products) {
          await cartPage.removeProduct(product);
        }
    
        expect(await cartPage.amountProductsInCart()).toBe(0);
    
        await cartPage.continueShopping();
        await productsPage.isProductsPageDisplayed();
    
        for (const product of products) {
          expect(await productsPage.isRemoveButtonVisible(product)).toBe(false);
        }
      }
    );     
      
  });
});
