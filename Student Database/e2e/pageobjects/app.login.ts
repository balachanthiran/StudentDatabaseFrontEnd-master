import { browser, element, by, $, $$, ExpectedConditions } from 'protractor';

export class LoginPage {
    navigateTo(){
        browser.get('/login');
        browser.waitForAngular();
    }

    login(){
        $('input[name="email"]').sendKeys('test@test.com');
        $('input[name="password"]').sendKeys('Test123');
        element(by.buttonText('LOGIN')).click();
    }

    submitLater(){
        browser.wait(ExpectedConditions.elementToBeClickable(element(by.buttonText('LATER'))), 5000);
        element(by.buttonText('LATER')).click();
    }

    goToProfile(){
        browser.actions().mouseMove($('.dropdown')).perform();
        browser.wait(function() {
            return $('.dropdown-content').isDisplayed();
        }, 5000);
        $$('.styled-link').get(0).click();
    }

    logout(){
        browser.actions().mouseMove($('.dropdown')).perform();
        browser.wait(function() {
            return $('.dropdown-content').isDisplayed();
        }, 5000);
        $$('.styled-link').get(2).click();
    }
}