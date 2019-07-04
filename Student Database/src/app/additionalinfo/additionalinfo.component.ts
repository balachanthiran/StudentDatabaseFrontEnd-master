import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../animations';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill } from '../_models/skill'
import { Language } from '../_models/language'
import { Education } from '../_models/education'
import { Social } from '../_models/social'
import { UserService } from '../_services/user.service'

@Component({
    moduleId: module.id,
    selector: 'additionalinfo-component',
    templateUrl: 'additionalinfo.component.html',
    styleUrls: ['additionalinfo.component.css'],
    animations: [slideInDownAnimation]
})

export class AdditionalInfoComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';
    @HostBinding('style.position') position = 'absolute';
    @HostBinding('style.left') left = '0';
    @HostBinding('style.right') right = '0';


    ngOnInit(): void {
        // Put skill in array
        this._userService.getAllSkills().subscribe(
            result => {
                // Check for duplicates of each element in result
                for (let skill of result) {
                    if (!this.skillResult.find(x => x == skill.name)) {
                        this.skillResult.push(skill.name);
                    }
                }
            }
        )
    }


    constructor(private _userService: UserService, private _router: Router) {

    }

    languageArray: Language[] = [];
    skillArray: Skill[] = [];
    skillResult: Array<string> = [];
    skillSearchResult: Array<string> = [];

    study: string = "";
    faculty: string = "";
    selectedSkill: string = "";
    facebookurl: string = "";
    linkedinurl: string = "";


    engineeringStudies: string[] = ["Global Management and Manufacturing", "Mechatronics", "Innovation and Business", "Product Development and Innovation", "Chemistry",
        "Electronics", "Environmental Engineering", "Operations Management", "Physics and Technology", "Robot Systems", "Software Engineering"];
    healthScienceStudies: string[] = ["Medicine", "Clinical Biomechanics (chiropractor)", "Sport and Health", "Public Health Sciences"];
    humanitiesStudies: string[] = ["BSc Negot in Chinese", "European Master in Tourism Management (EMTM)", "MA in Business, Language and Culture (negot)", "MA in American Studies"];
    scienceStudies: string[] = ["Biology", "Biomedicine", "Computer science", "Mathematics"];
    socialScienceStudies: string[] = ["BSc Market and Management Anthropology", "European Studies"];

    selectStudy: boolean = false;
    engineeringStudyList = true;
    healthScienceStudyList = true;
    humanitiesStudyList = true;
    scienceStudyList = true;
    socialScienceStudyList = true;
    otherStudy = true;

    isLoading: boolean = false;
    networkError: boolean = false;


    // Language Selection
    addLanguage(selectedLanguage: string) {
        // Check array if the language is already selected
        if (!this.languageArray.find(x => x.name == selectedLanguage)) {
            this.languageArray.push({ userID: parseInt(localStorage.getItem('currentUserId')), name: selectedLanguage, level: "low" });
        }
    }

    removeLanguage(i: any) {
        this.languageArray.splice(i, 1);
    }

    //Line of Study Selection
    selectFaculty(selectedFaculty: string) {
        this.selectStudy = true;
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
            this.selectStudy = false;
            this.engineeringStudyList = true;
            this.healthScienceStudyList = true;
            this.humanitiesStudyList = true;
            this.scienceStudyList = true;
            this.socialScienceStudyList = true;
            this.otherStudy = false;
        }

    }

    // Add Skill
    addToSkill(skillInput: HTMLInputElement) {
        let value = skillInput.value;
        //Check for being empty, whitespace and duplicate
        if (value && value.trim().length && !this.skillArray.find(x => x.name == value)) {
            this.skillArray.push({ userID: parseInt(localStorage.getItem('currentUserId')), name: value, level: "low" });
        }
        skillInput.value = '';
    }

    findSkill(event: any) {
        let value = event.target.value.toLowerCase();

        // Check if input is empty
        if (value != "") {
            // For every skill in skillResult
            for (let result of this.skillResult) {
                let lowerResult = result.toLowerCase();

                // Check if result starts with the value of the input
                if (lowerResult.startsWith(value)) {

                    // Check if the result exists in skillSearchResult
                    if (!this.skillSearchResult.find(x => x == result)) {

                        // Insert in array
                        this.skillSearchResult.push(result);

                        console.log(this.skillSearchResult);


                    }
                } else {

                    if (this.skillSearchResult.find(x => x == result)) {

                        this.skillSearchResult.splice(this.skillSearchResult.indexOf(result), 1);

                    }
                }

            }

        } else {
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

    chosenSkill(chosen: string, skillInput: HTMLInputElement) {

        this.selectedSkill = chosen;

        if (this.selectedSkill && this.selectedSkill.trim().length && !this.skillArray.find(x => x.name == this.selectedSkill)) {
            console.log(this.selectedSkill);
            this.skillArray.push({ userID: parseInt(localStorage.getItem('currentUserId')), name: this.selectedSkill, level: "low" });

            //Remove from search result list when clicked
            this.skillSearchResult.splice(this.skillSearchResult.indexOf(this.selectedSkill), 1);
        }

        // Input field empty
        skillInput.value = "";

    }


    removeSkill(i: any) {
        this.skillArray.splice(i, 1);
    }

    submitInfo() {
        this.isLoading = true;
        this._userService.insertAdditionalInfo({ education: new Education(parseInt(localStorage.getItem('currentUserId')), this.faculty, this.study), social: new Social(parseInt(localStorage.getItem('currentUserId')), this.facebookurl, this.linkedinurl), languages: this.languageArray, skills: this.skillArray })
            .subscribe(
            result => {
                if (result === true) {
                    //inform user that it was a success
                    localStorage.setItem('submitLater'+ localStorage.getItem('currentUserId'), "false");
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

    submitLater(){
        this.isLoading = true;
        this._userService.insertAdditionalInfo({ education: new Education(parseInt(localStorage.getItem('currentUserId')), "", ""), social: new Social(parseInt(localStorage.getItem('currentUserId')), "", ""), languages: [], skills: [] })
            .subscribe(
            result => {
                if (result === true) {
                    //inform user that it was a success
                    localStorage.setItem('submitLater'+ localStorage.getItem('currentUserId'), "false");
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

        this._router.navigate(['']);
        localStorage.setItem('submitLater'+ localStorage.getItem('currentUserId'), "false");
    }

    addSkillLevel(level: string, index: number) {
        this.skillArray[index].level = level;
    }

    addLanguageLevel(level: string, index: number) {
        this.languageArray[index].level = level;
    }


}