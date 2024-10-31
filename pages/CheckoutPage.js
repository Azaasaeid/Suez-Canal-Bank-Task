const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator("#checkout");
        this.firstNameInput = page.locator("#first-name");
        this.lastNameInput = page.locator("#last-name");
        this.postalCodeInput = page.locator("#postal-code");
        this.continueButton = page.locator("#continue");
        this.overviewTitle = page.locator('.title');
        this.finishButton = page.locator("#finish");
        this.orderConfirmation = page.locator('h2.complete-header');
        this.cancelButton = page.locator("#cancel");
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async cancelationButton(){
        await this.cancelButton.click();
    }

    async fillCheckoutForm(firstName, lastName, postalCode) {
        await this.page.waitForSelector('#first-name', { state: 'visible' });
        
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async completeCheckout() {
        await this.finishButton.click();
    }

    async verifyOrderCompletion() {
        await expect(this.completeHeader).toContainText("Thank you for your order!");
    }
}

module.exports = CheckoutPage;
