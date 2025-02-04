import ProductPage from './ProductPage';

class ProductDetailPage extends ProductPage{
    
    //ProductDetailUrl = `https://automationexercise.com/product_details/${}`
    getQuantitySelector = () => cy.get('input#quantity')
    getProductName = () => cy.get('.product-information h2')
    getCategory = () => cy.get('.product-information > p:first-of-type')
    getPrice = () => cy.get('.product-information span span');
    getAvailability = () => cy.get('.product-information p:nth-of-type(2)');
    getCondition = () => cy.get('.product-information p:nth-of-type(3)');
    getBrand = () => cy.get('.product-information p:nth-of-type(4)');
    getWriteYourReviewSign = () => cy.get('.active [href="#reviews"]');
    getReviewerNameField = () => cy.get('#review-form #name');
    getReviewerEmailField = () => cy.get('#review-form #email');
    getReviewField = () => cy.get('#review-form #review');
    getSubmitReviewButton = () => cy.get('button#button-review');
    getSuccessReviewMessage = () => cy.get('#review-section .alert-success')
    getAddToCartButton = () => cy.get('button.cart');

    verifyQuantitySelectorVisible () {
        this.getQuantitySelector().should('be.visible');
        return this;
    }

    verifyProductNameVisible () {
        this.getProductName().should('be.visible');
        return this;
    }

    verifyReviewSignVisible () {
        this.getWriteYourReviewSign().should('be.visible')
        return this;
    }

    verifyCategoryVisible () {
        this.getCategory().should('be.visible');
        return this;
    }

    verifyPriceVisible () {
        this.getPrice().should('be.visible');
        return this;
    }

    verifyAvailabilityVisible() {
        this.getAvailability().should('be.visible');
        return this;
    }
    
    verifyConditionVisible() {
        this.getCondition().should('be.visible');
        return this; 
    }
    
    verifyBrandVisible() {
        this.getBrand().should('be.visible');
        return this; 
    }

    verifyMainProductDetailPageElementsVisible() {
        this.verifyQuantitySelectorVisible();
        this.verifyProductNameVisible();
        this.verifyCategoryVisible();
        this.verifyPriceVisible();
        this.verifyAvailabilityVisible();
        this.verifyConditionVisible();
        this.verifyBrandVisible();
        return this; // Для возможности цепочек вызовов, если требуется
    }

    verifyQuantityValue(expectedValue) {
        this.getQuantitySelector().should('have.value', expectedValue);
        return this;
    }
    
    verifyProductNameValue(expectedValue) {
        this.getProductName().should('have.text', expectedValue);
        return this;
    }
    
    verifyCategoryValue(expectedValue) {
        this.getCategory().should('contain.text', expectedValue);
        return this;
    }
    
    verifyPriceValue(expectedValue) {
        this.getPrice().should('have.text', expectedValue);
        return this;
    }
    
    verifyAvailabilityValue(expectedValue) {
        this.getAvailability().should('contain.text', expectedValue);
        return this;
    }
    
    verifyConditionValue(expectedValue) {
        this.getCondition().should('contain.text', expectedValue);
        return this;
    }
    
    verifyBrandValue(expectedValue) {
        this.getBrand().should('contain.text', expectedValue);
        return this;
    }

    fillAndSubmitReviewForm (name, email, review) {
        this.getReviewerNameField().type(name)
        this.getReviewerEmailField().type(email)
        this.getReviewField().type(review)
        this.getSubmitReviewButton().click()
        return this;
    }
    
    setProductQty(quantity) {
        this.getQuantitySelector().clear().type(quantity);
        return this;
    }

    clickAddToCartButton () {
        this.getAddToCartButton().click();
        return this;
    }
    

}

export default ProductDetailPage;