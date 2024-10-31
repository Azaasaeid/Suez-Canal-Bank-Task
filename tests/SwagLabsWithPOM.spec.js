const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/ProductPage');
const CheckoutPage = require('../pages/CheckoutPage');

//scenario no.1 (LogIn)
test('Login Test', async ({ page }) => 
 {
   const loginPage = new LoginPage(page);
        
   await page.goto("https://www.saucedemo.com");
   await loginPage.login("standard_user", "");
   await expect(page.locator("[data-test='error']")).toContainText('Epic');
   
   await loginPage.login("standard_user", "secret_sauce");
   await expect(page).toHaveTitle("Swag Labs");
   await page.waitForTimeout(2000);

});

//Scenario no.2 (Sorting the products)
test('Product Sorting Test', async ({ page }) => 
{
   const loginPage = new LoginPage(page);
   const productPage = new ProductPage(page);

   await page.goto("https://www.saucedemo.com");
   await loginPage.login("standard_user", "secret_sauce");
   
   await productPage.sortProducts('za');
   console.log('Products sorted by Z to A');
   await page.waitForTimeout(2000);
});

// Scenario no.3 (Add products from landing page)
test('Add Product to Cart Test', async ({ page }) => {
   const loginPage = new LoginPage(page);
   const productPage = new ProductPage(page);

   await page.goto("https://www.saucedemo.com");
   await loginPage.login("standard_user", "secret_sauce");

   await productPage.addToCart();
   console.log('First product added to cart');
   await page.waitForTimeout(2000);
});

// Scenario no.4 (Remove product from landing page)
test('Remove Product from Cart Test', async ({ page }) => {
   const loginPage = new LoginPage(page);
   const productPage = new ProductPage(page);

   await page.goto("https://www.saucedemo.com");
   await loginPage.login("standard_user", "secret_sauce");

   await productPage.addToCart();
   console.log('First product added to cart');

   await productPage.removeFromCart();
   console.log('First product removed from cart');
   await page.waitForTimeout(2000);
});

//scenario no.5 (View cart products)
test('View The Cart Test', async ({ page }) => {
   const loginPage = new LoginPage(page);
   const productPage = new ProductPage(page);

   await page.goto("https://www.saucedemo.com");
   await loginPage.login("standard_user", "secret_sauce");

   await productPage.addToCart();
   await productPage.openCart();
   await page.waitForTimeout(2000);
});

//scenario no.6 (Fill Checkout form)
test('Checkout Process Test', async ({ page }) => {
   const loginPage = new LoginPage(page);
   const productPage = new ProductPage(page);
   const checkoutPage = new CheckoutPage(page);

   await page.goto("https://www.saucedemo.com");
   await loginPage.login("standard_user", "secret_sauce");

   await productPage.addToCart();
   await productPage.openCart();

   await checkoutPage.proceedToCheckout();
   await checkoutPage.fillCheckoutForm("Azza", "Saeid", "42536");
   await checkoutPage.completeCheckout();
   await expect(checkoutPage.orderConfirmation).toContainText("Thank you for your order!");
   console.log('Successfully completed payment');
   await page.waitForTimeout(2000);
});

//scenario no.7 (Canceling checkout)
test('Canceling checkout Test', async ({ page }) => {
   const loginPage = new LoginPage(page);
   const productPage = new ProductPage(page);
   const checkoutPage = new CheckoutPage(page);

   await page.goto("https://www.saucedemo.com");
   await loginPage.login("standard_user", "secret_sauce");

   await productPage.addToCart();
   await productPage.openCart();

   await checkoutPage.proceedToCheckout();
   await checkoutPage.fillCheckoutForm("Azza", "Saeid", "42536");
   await checkoutPage.cancelationButton();
   await page.waitForTimeout(2000);
});

//scenario no.8 (Remove products from cart)
test('Remove products from cart Test', async ({ page }) => {
   const loginPage = new LoginPage(page);
   const productPage = new ProductPage(page);
   const checkoutPage = new CheckoutPage(page);

   await page.goto("https://www.saucedemo.com");
   await loginPage.login("standard_user", "secret_sauce");

   await productPage.addToCart();
   await productPage.openCart();
   await page.waitForTimeout(500);

   await productPage.removeProductFromCart();

   await page.waitForTimeout(2000);
});

//scenario no.9 (Checkout of empty cart)
test('Checkout of empty cart Test', async ({ page }) => {
   const loginPage = new LoginPage(page);
   const productPage = new ProductPage(page);
   const checkoutPage = new CheckoutPage(page);

   await page.goto("https://www.saucedemo.com");
   await loginPage.login("standard_user", "secret_sauce");

   await productPage.openCart();

   await checkoutPage.proceedToCheckout();
   await checkoutPage.fillCheckoutForm("Azza", "Saeid", "42536");
   await checkoutPage.completeCheckout();

   await page.waitForTimeout(2000);
});

//scenario no.10 (LogOut)
test('Log Out Test', async ({ page }) => {
   const loginPage = new LoginPage(page);

   await page.goto("https://www.saucedemo.com");
   await loginPage.login("standard_user", "secret_sauce");

   await page.locator('#react-burger-menu-btn').click();
   await page.locator("#logout_sidebar_link").click();
   console.log('Logged out successfully');
   await page.waitForTimeout(2000);
});