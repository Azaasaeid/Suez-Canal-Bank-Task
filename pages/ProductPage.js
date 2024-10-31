const { expect } = require('@playwright/test');

class ProductPage {
    constructor(page) {
        this.page = page;
        this.sortDropdown = page.locator('.product_sort_container');
        this.addToCartButtons = page.locator('.btn_inventory');
        this.cartIcon = page.locator('a.shopping_cart_link');
        this.removeIcon = page.locator("#remove-sauce-labs-backpack");
    }

    async sortProducts(order) {
        await this.sortDropdown.selectOption(order);
    }

    async addToCart(index = 0) {
        await this.addToCartButtons.nth(index).click();
    }

    async removeFromCart(index = 0) {
        await this.addToCartButtons.nth(index).click();
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async removeProductFromCart(index = 0){
        await this.removeIcon.nth(index).click();
    }
    
    
}

module.exports = ProductPage;
