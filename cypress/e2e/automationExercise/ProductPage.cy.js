/// <reference types="cypress" />
import NavigationMenu from '../../pageObjects/NavigationMenu';
import HomePage from '../../pageObjects/HomePage';
import ProductPage from '../../pageObjects/ProductPage';
import ProductDetailPage from '../../pageObjects/ProductDetailPage';
import SideBar from '../../pageObjects/SideBar';


describe('Automation Exercise Test Cases', () => {
    const navigationMenu = new NavigationMenu();
    const homePage = new HomePage();
    const productPage = new ProductPage();
    const productDetailPage = new ProductDetailPage
    const sideBar = new SideBar
    let reviewData;


    before(() => {
        cy.fixture('userData').then((data) => {
            reviewData = data;
        })
    });

    beforeEach(function () {
        cy.clearCookies();
        cy.clearLocalStorage();
        homePage.navigateToHome()
    });

    it('Test Case 8: Verify All Products and product detail page', () => {
        navigationMenu.verifyHomeButtonHighlighted()
            .clickProducts();
        productPage.verifyAllProductsListVisible()
            .clickFirstProductViewLink()

        productDetailPage.verifyMainProductDetailPageElementsVisible();
    });

    it('Test Case 9: Search Product', () => {
        navigationMenu.verifyHomeButtonHighlighted()
            .clickProducts();
        productPage.verifyAllProductsListVisible()
        cy.fixture('productNames').then((data) => {
            const productName = data.productsByName
            productName.forEach((name) => {
                productPage.searchProduct(name)
                    .getProductList().each(($el, i) => {
                        cy.wrap($el)
                            .find('p')
                            .invoke('text')
                            .then((text) => {
                                expect(text).to.eq.name
                            })
                    })
            })
        })
    });

    it('Test Case 18: View Category Products', () => {
        cy.fixture('productNames').then((data) => {
            const categories = data.categories;   
            Object.keys(categories).forEach((categorySex) => {
                Object.keys(categories[categorySex]).forEach((subCategoryName) => {
    
                    navigationMenu.clickProducts();
                    sideBar.verifySideBarIsVisible()
                        .clickCategory(categorySex) 
                        .clickSubCategory(categorySex, subCategoryName); 
    
                    productPage.verifyAllProductsTitleContainsText(categorySex, subCategoryName);
                });
            });
        });
    });    

    it('Test Case 19: View & Cart Brand Products', () => {
        cy.fixture('productNames').then((data) => {
            const brandsList = data.brands;
            brandsList.forEach((brand) => {
                navigationMenu.clickProducts();
                sideBar.verifyBrandsSideBarIsVisible()
                    .clickBrandCategory(brand)

                productPage.verifyAllProductsTitleContainsText("Brand", brand);
            });
        });
    });

    it('Test Case 21: Add review on product', () => {
        navigationMenu.verifyHomeButtonHighlighted()
            .clickProducts();
        productPage.verifyAllProductsListVisible()
            .clickFirstProductViewLink()
        productDetailPage.verifyReviewSignVisible()
            .fillAndSubmitReviewForm(reviewData.userName, reviewData.email, reviewData.review)

        productDetailPage.getSuccessReviewMessage().should('be.visible')
    });
    
});
