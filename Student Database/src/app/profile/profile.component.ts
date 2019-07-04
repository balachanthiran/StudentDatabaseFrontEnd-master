import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { slideInDownAnimation } from '../animations';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { AdditionalInfo } from '../_models/additionalinfo';
import { Skill } from '../_models/skill'
import { Language } from '../_models/language'
import { Education } from '../_models/education'
import { Social } from '../_models/social'
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  selector: 'profile-component',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
  animations: [slideInDownAnimation]

})
export class ProfileComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  @HostBinding('style.left') left = '0';
  @HostBinding('style.right') right = '0';

  //used to unsubscribe from router when component is destroyed
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  imageurl: any = "";

  imageArray: string[];
  languageArray: Language[] = [];
  skillArray: Skill[] = [];
  skillSearchResult: Array<string> = [];
  allSkills: Array<string> = [];

  study: string = "";
  faculty: string = "";

  facebookurl: string = "";
  linkedinurl: string = "";


  engineeringStudies: string[] = ["Global Management and Manufacturing", "Mechatronics", "Innovation and Business", "Product Development and Innovation", "Chemistry",
    "Electronics", "Environmental Engineering", "Operations Management", "Physics and Technology", "Robot Systems", "Product Development and Innovation", "Software Engineering"];
  healthScienceStudies: string[] = ["Medicine", "Clinical Biomechanics (chiropractor)", "Sport and Health", "Public Health Sciences"];
  humanitiesStudies: string[] = ["BSc Negot in Chinese", "European Master in Tourism Management (EMTM)", "MA in Business, Language and Culture (negot)", "MA in American Studies"];
  scienceStudies: string[] = ["Biology", "Biomedicine", "Computer science", "Mathematics"];
  socialScienceStudies: string[] = ["BSc Market and Management Anthropology", "European Studies"];

  engineeringStudyList = true;
  healthScienceStudyList = true;
  humanitiesStudyList = true;
  scienceStudyList = true;
  socialScienceStudyList = true;
  otherStudy = true;

  isLoading: boolean = false;
  networkError: boolean = false;

  currentUser: User;
  currentAdditionalInfo: AdditionalInfo;

  constructor(private _router: Router, private _userService: UserService) {
  }

  ngOnInit(): void {

      this._router.events.takeUntil(this.ngUnsubscribe).subscribe((val) => {

      if(val instanceof NavigationEnd ){

      let url = val.url.split('/')[2];
      this._userService.getSingleUser(parseInt(url)).subscribe((userResult: User) => {
      this.currentUser = userResult;
      
      this._userService.getAdditionalInfo(parseInt(url)).subscribe((additionalInfoResult: AdditionalInfo) => {
      this.languageArray = additionalInfoResult.languages;
      this.skillArray = additionalInfoResult.skills;
      if(additionalInfoResult.education){
      this.faculty = additionalInfoResult.education.faculty;
      this.study = additionalInfoResult.education.study;
      this.selectFaculty(this.faculty);
    }
      if(additionalInfoResult.social){
        this.facebookurl = additionalInfoResult.social.facebook;
        this.linkedinurl = additionalInfoResult.social.linkedin;
      }

      this.currentAdditionalInfo = additionalInfoResult;

    })
    })
    }


    })



    // Put skill in array
    this._userService.getAllSkills().subscribe(
      result => {
        // Check for duplicates of each element in result
        for (let skill of result) {
          if (!this.allSkills.find(x => x == skill.name)) {
            this.allSkills.push(skill.name);
          }
        }
      }
    )

  }

  ngOnDestroy(): void {
      //unsubscribe from router
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }

  // Profile picture
  readUrl(event: any) {
    // If a files is selected, the event is true AND if the file is opened,
    // it is in index 0, so the event is true
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      // When file loaded, this event is triggered. Now the file can be read
      reader.onload = (event: any) => {
        this.imageurl = event.target.result;

        // Push image base64 string into array 
        this._userService.insertImage(this.imageurl).subscribe(
          result => {
            if (result == true) {
              //inform user about error
              this.currentUser.image = this.imageurl;
            }
          },
          err => {
            console.log("Error: " + err);
          }
        );
      }
      // The file opened is read as data URL and the image can be previewed
      reader.readAsDataURL(event.target.files[0]);
    }

  }


  // Language Selection
  addLanguage(selectedLanguage: string) {
    // Check array if the language is already selected
    if (!this.languageArray.find(x => x.name == selectedLanguage)) {
    this._userService.addLanguage({ userID: parseInt(localStorage.getItem('currentUserId')), name: selectedLanguage, level: "low" })
      .subscribe(
        result => {
            this.languageArray.push({ userID: parseInt(localStorage.getItem('currentUserId')), languageId: result, name: selectedLanguage, level: "low" });
        },
          err => {
            console.log(err);
          }
      )
    }
  }

  removeLanguage(i: any) {
    this._userService.deleteLanguage(this.languageArray[i].languageId).subscribe(
      result => {
        if(result == true){
          this.languageArray.splice(i, 1);
        } else console.log("FAILED");
      },
      err => {
        console.log(err);
      }
    );
  }

  //Line of Study Selection
  selectFaculty(selectedFaculty: string) {
    if (selectedFaculty == "Faculty of Engineering") {
      this.engineeringStudyList = false;
      this.healthScienceStudyList = true;
      this.humanitiesStudyList = true;
      this.scienceStudyList = true;
      this.socialScienceStudyList = true;
      this.otherStudy = true;
    } else if (selectedFaculty == "Faculty of Health Sciences") {
      this.engineeringStudyList = true;
      this.healthScienceStudyList = false;
      this.humanitiesStudyList = true;
      this.scienceStudyList = true;
      this.socialScienceStudyList = true;
      this.otherStudy = true;
    } else if (selectedFaculty == "Faculty of Humanities") {
      this.engineeringStudyList = true;
      this.healthScienceStudyList = true;
      this.humanitiesStudyList = false;
      this.scienceStudyList = true;
      this.socialScienceStudyList = true;
      this.otherStudy = true;
    } else if (selectedFaculty == "Faculty of Science") {
      this.engineeringStudyList = true;
      this.healthScienceStudyList = true;
      this.humanitiesStudyList = true;
      this.scienceStudyList = false;
      this.socialScienceStudyList = true;
      this.otherStudy = true;
    } else if (selectedFaculty == "Faculty of Business and Social Sciences") {
      this.engineeringStudyList = true;
      this.healthScienceStudyList = true;
      this.humanitiesStudyList = true;
      this.scienceStudyList = true;
      this.socialScienceStudyList = false;
      this.otherStudy = true;
    } else if (selectedFaculty == "Other...") {
      this.engineeringStudyList = true;
      this.healthScienceStudyList = true;
      this.humanitiesStudyList = true;
      this.scienceStudyList = true;
      this.socialScienceStudyList = true;
      this.otherStudy = false;
    }

  }

  // Add Skill
  addToSkill(newSkill: HTMLInputElement) {
    console.log(newSkill);
    let value = newSkill.value;
    //Check for being empty, whitespace and duplicate
    if (value && value.trim().length && !this.skillArray.find(x => x.name == value)) {
      this._userService.addSkill({ userID: parseInt(localStorage.getItem('currentUserId')), name: value, level: "low" })
      .subscribe(
        result => {
            //success
            this.skillArray.push({ userID: parseInt(localStorage.getItem('currentUserId')), skillId: result, name: value, level: "low" });
        },
          err => {
            console.log(err);
          }
      )
    }
    newSkill.value = '';
  }

  findSkill(event: any) {
    let value = event.target.value.toLowerCase();
    // Check if input is empty
    if (value != "") {
      // Go through all skills
      for (let skill of this.allSkills) {
        let lowerResult = skill.toLowerCase();
        // Check if skill starts with the value of the input
        if (lowerResult.startsWith(value)) {
          // Check if the skill exists in skillSearchResult
          if (!this.skillSearchResult.find(x => x == skill)) {
            // Insert in array
            this.skillSearchResult.push(skill);
          }
        } else {
          if (this.skillSearchResult.find(x => x == skill)) {
            this.skillSearchResult.splice(this.skillSearchResult.indexOf(skill), 1);
          }
        }
      }
      //Max 10 skills at a time
      this.skillSearchResult.splice(10, this.allSkills.length);
    } else {
      //if input is empty, clear array
      this.skillSearchResult = [];
    }
  }

  // Make query everytime user types in inputfield (Old way)
  /* findSkill(event: any) {
       this._userService.getSkill(event.target.value).subscribe(
           result => {
               this.skillResult = result;
               //for(let skill of result){
               //    this.skillResultArray.push(skill.name);
               //}
           }
       )
   }*/

  chooseSkill(selectedSkill: string, newSkill: HTMLInputElement) {
    
    console.log(this.canEdit());
    if (selectedSkill && selectedSkill.trim().length && !this.skillArray.find(x => x.name == selectedSkill)) {
      console.log(selectedSkill);

      this._userService.addSkill({ userID: parseInt(localStorage.getItem('currentUserId')), name: selectedSkill, level: "low" })
      .subscribe(
        result => {
            this.skillArray.push({ userID: parseInt(localStorage.getItem('currentUserId')), skillId: result, name: selectedSkill, level: "low" });
            //Remove from search result list when clicked
            this.skillSearchResult.splice(this.skillSearchResult.indexOf(selectedSkill), 1);
        },
          err => {
            console.log(err);
          }
      )
    }
    // Input field empty
    newSkill.value = "";

  }

  removeSkill(i: any) {
    console.log(this.skillArray[i]);
    this._userService.deleteSkill(this.skillArray[i].skillId).subscribe(
      result => {
        if(result == true){
            this.skillArray.splice(i, 1);
        } else console.log("FAILED");
      },
      err => {
        console.log(err);
      }
    );
  }

  submitInfo() {
    this.isLoading = true;
    this._userService.insertAdditionalInfo({ education: new Education(parseInt(localStorage.getItem('currentUserId')), this.faculty, this.study), social: new Social(parseInt(localStorage.getItem('currentUserId')), this.facebookurl, this.linkedinurl), languages: this.languageArray, skills: this.skillArray })
      .subscribe(
      result => {
        if (result === true) {
          //inform user that it was a success
          this._router.navigate(['']);

        } else {

          //inform user that it was a failure


        }
      },
      err => {

        this.isLoading = false;
        this.networkError = true;

      }
      );

  }

  addSkillLevel(level: string, index: number) {
    this._userService.updateSkill(this.skillArray[index].skillId, level).subscribe(
      result => {
        if(result == true) this.skillArray[index].level = level;
      },
      err => {
        console.log(err);
      }
    )
  }

  addLanguageLevel(level: string, index: number) {
      this._userService.updateLanguage(this.languageArray[index].languageId, level).subscribe(
      result => {
        if(result == true) this.languageArray[index].level = level;
      },
      err => {
        console.log(err);
      }
    )
  }

  canEdit() {
    if (this.currentUser != null) return localStorage.getItem('currentUserId') == String(this.currentUser.userID);
  }

  checkSkillLevel(index: number, level: string) {
    if (this.currentAdditionalInfo != null) return this.currentAdditionalInfo.skills[index].level == level;
  }

  getSkillLevel(index: number) {
    if (this.currentAdditionalInfo != null) return this.currentAdditionalInfo.skills[index].level == "low" ? "Beginner" : this.currentAdditionalInfo.skills[index].level == "medium" ? "Advanced" : "Expert";
  }

  checkLanguageLevel(index: number, level: string) {
    if (this.currentAdditionalInfo != null) return this.currentAdditionalInfo.languages[index].level == level;
  }

  getLanguageLevel(index: number) {
    if (this.currentAdditionalInfo != null) return this.currentAdditionalInfo.languages[index].level == "low" ? "Limited" : this.currentAdditionalInfo.languages[index].level == "medium" ? "Intermediate" : "Fluent";
  }

  updateEducation(){
    this._userService.updateEducation(this.faculty, this.study).subscribe(
      result => {
      },
      err => {
        console.log(err);
      }
    );
  }

  updateSocial(){
    this._userService.updateSocial(this.facebookurl, this.linkedinurl).subscribe(
      result => {

      },
      err => {
        console.log(err);
      }

    )
  }

}