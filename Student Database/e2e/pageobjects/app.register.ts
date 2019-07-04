import { browser, element, by, $, $$, ExpectedConditions } from 'protractor';

export class RegisterPage {
    navigateTo(){
        browser.get('/login');
        browser.wait(ExpectedConditions.elementToBeClickable($('.btn.btn-link')), 5000);
        $('.btn.btn-link').click();
    }

    addInvalidInfo(){
        //$ is shortcut for element(by.css("selector"))
        browser.wait(function() {
            return $('input[name="firstname"]').isDisplayed();
        }, 5000);
        $('input[name="firstname"]').sendKeys('111John');
        $('input[name="lastname"]').sendKeys('222Doe');
        $('input[name="email"]').sendKeys('test@mail.');
        $('input[name="password"]').sendKeys('hej12');
        $('input[name="birthday"]').sendKeys('12-12-199');
        $('input[name="city"]').sendKeys('333Odense');
    }

      getInvalidInputCount(){
        //$$ is shortcut for element.all(by.css("selector"))
        return $$('.ng-invalid').count();
    }

    addValidInfo(){
        browser.wait(function() {
            return $('input[name="firstname"]').isDisplayed();
        }, 5000);
        $('input[name="firstname"]').sendKeys('John');
        $('input[name="lastname"]').sendKeys('Doe');
        $('input[name="email"]').sendKeys('test@mail.dk');
        $('input[name="password"]').sendKeys('Hej12');
        $('option[value="Male"]').click();
        $('input[name="birthday"]').sendKeys('12-12-1994');
        $('option[value="Afghanistan"]').click();
        $('input[name="city"]').sendKeys('Odense');
    }

     getValidInputCount(){
        return $$('.ng-valid').count();
    }  
  
}