import { browser, element, by, $, $$, ExpectedConditions } from 'protractor';

export class HomePage {
    navigateTo(){
        //go to login page
        browser.get('/login');
        browser.waitForAngular();
        //login
        $('input[name="email"]').sendKeys('test@test.com');
        $('input[name="password"]').sendKeys('Test123');
        browser.wait(ExpectedConditions.elementToBeClickable(element(by.buttonText('LOGIN'))), 5000);
        element(by.buttonText('LOGIN')).click();
        //continue from additionalinfo page
        browser.wait(ExpectedConditions.elementToBeClickable(element(by.buttonText('LATER'))), 5000);
        element(by.buttonText('LATER')).click();
        browser.driver.executeScript(this.disableCSSAnimations);
    }
    
    search(){
        browser.waitForAngular();
        $('input[name="searchbar"]').sendKeys('danish');
        browser.wait(ExpectedConditions.elementToBeClickable($('.btn-search')), 5000);
        $('.btn-search').click();
    }

    isSearchResultDisplayed(){
        return $('.searchResult').isPresent();
    }

    checkFirstSearchResult(){
        browser.actions().mouseMove($$('.searchResult').get(0)).perform();
        $$('input[type="checkbox"]').get(0).click();
    }

    getFirstSearchResultName(){
        return $$('#resultName').get(0).getText();
    }

    getFirstContactListName(){
        return $$('#contactAll p').get(1).getText();
    }

    goToProfile(){
        browser.actions().mouseMove($('.dropdown')).perform();
        browser.wait(function() {
            return $('.dropdown-content').isDisplayed();
        }, 5000);
        $$('.styled-link').get(0).click();
    }

    goBacktoHome(){
        $('img[title="Made for the University of Southern Denmark."]').click();
    }

    disableCSSAnimations() {
    //This function is used to disable all CSS animations. It has to be called every time Protractor navigates to a new page
    let css = '* {' +
        '-webkit-transition-duration: 0s !important;' +
        'transition-duration: 0s !important;' +
        '-webkit-animation-duration: 0s !important;' +
        'animation-duration: 0s !important;' +
        '}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

      style.type = 'text/css';
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    }    
}