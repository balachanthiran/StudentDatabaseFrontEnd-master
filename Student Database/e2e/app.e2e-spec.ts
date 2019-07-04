import { browser, element, by } from 'protractor';
import { RegisterPage, LoginPage, HomePage, ProfilePage } from './pageobjects'

describe('Register tests', function () {  
  let registerPage: RegisterPage = new RegisterPage();
  beforeEach(function () { 
  });

  it('should display all inputs as invalid', function () {
    registerPage.navigateTo();

    registerPage.addInvalidInfo();
    expect(registerPage.getInvalidInputCount()).toBe(9);
  });

  it('should display all inputs as valid', function () {
    browser.navigate().refresh();

    registerPage.addValidInfo();
    expect(registerPage.getValidInputCount()).toBe(9);
  });  
});

describe('Login and accessibility tests', function(){
  let loginPage: LoginPage = new LoginPage();

  beforeEach(function(){
  });

  it('should redirect to login page when user is not logged in', function(){
    browser.get('');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/login');

    browser.get('/profile/1');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/login');

    browser.get('/additionalinfo');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/login');
  });

  it('should not redirect to login page when the user is logged in', function(){
    loginPage.login();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/additionalinfo');

    loginPage.submitLater();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/');

    loginPage.goToProfile();
    expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '/profile/');
  });

  it('should not allow access to login page before user is logged out', function(){
    loginPage.navigateTo();

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/');
    loginPage.logout();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/login');
  });
});


describe('Home tests', function(){
  let homePage: HomePage = new HomePage();;

  beforeEach(function(){
  });

  it('should display search results', function(){
    homePage.navigateTo();
    homePage.search();
    expect(homePage.isSearchResultDisplayed()).toBe(true);
  });

  it('should add users to a list when their checkbox is checked', function(){
    homePage.checkFirstSearchResult();
    expect(homePage.getFirstSearchResultName()).toContain(homePage.getFirstContactListName());

  });

  it('should maintain its state when the user navigates to another page', function(){
    homePage.goToProfile();
    expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '/profile/');
    homePage.goBacktoHome();
    expect(homePage.isSearchResultDisplayed()).toBe(true);
  });
});

describe('Profile tests', function(){
  let profilePage: ProfilePage  = new ProfilePage();
  let newStudy = 'Software Engineering';
  let oldStudy = 'Robot Systems';

  beforeEach(function(){
  });

  it('should be able to add a new language, study and skill', function(){
    profilePage.navigateTo();

    expect(profilePage.getLanguageCount()).toEqual(0);
    profilePage.addLanguage();
    expect(profilePage.getLanguageCount()).toEqual(1);

    expect(profilePage.getSkillCount()).toEqual(0);
    profilePage.addSkill();
    expect(profilePage.getSkillCount()).toEqual(1);

    expect(profilePage.getStudy()).toEqual(oldStudy);
    profilePage.changeStudy(newStudy);
    expect(profilePage.getStudy()).toEqual(newStudy);

  });

  it('should persist changes (add)', function(){
    browser.navigate().refresh();

    expect(profilePage.getLanguageCount()).toEqual(1);
    expect(profilePage.getSkillCount()).toEqual(1);
    expect(profilePage.getStudy()).toEqual(newStudy);

    //change study back to old study to prevent failure on next test
    profilePage.changeStudy(oldStudy);
  });

  it('should be able to delete languages and skills', function(){
    profilePage.deleteLanguage();
    expect(profilePage.getLanguageCount()).toEqual(0);
  
    profilePage.deleteSkill();
    expect(profilePage.getLanguageCount()).toEqual(0);
  });

  it('should persist changes (delete)', function(){
    browser.navigate().refresh();

    expect(profilePage.getLanguageCount()).toEqual(0);
    expect(profilePage.getSkillCount()).toEqual(0);
  });
});
