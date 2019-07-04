import { browser, element, by, $, $$, ExpectedConditions } from 'protractor';

export class ProfilePage {
    navigateTo(){
        //go to profile page
        browser.actions().mouseMove($('.dropdown')).perform();
        browser.wait(function() {
            return $('.dropdown-content').isDisplayed();
        }, 5000);
        $$('.styled-link').get(0).click();
    }

    addLanguage(){
        $('option[value="Afrikaans"]').click();
    }

    changeStudy(newStudy: string){
        $('option[value="' + newStudy + '"]').click();
    }

    addSkill(){
        $('#skillInputField').sendKeys('CSS');
        $('.skillItem').click();
    }

    deleteLanguage(){
        return $$('#languageList .chip .removeBtn').click();
    }

    deleteSkill(){
        return $$('.skillList .chip .removeBtn').click();
    }

    getLanguageCount(){
        browser.wait(function() {
            return $$('#languageList .chip').isDisplayed();
        }, 5000);
         return $$('#languageList .chip').count();
    }

    getStudy(){
        return $('select[name="selectedStudy"]').getAttribute('value');
    }

    getSkillCount(){
         browser.wait(function() {
            return $$('.skillList .chip').isDisplayed();
        }, 5000);
        return $$('.skillList .chip').count();
    }



}