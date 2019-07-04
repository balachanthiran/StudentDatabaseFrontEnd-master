import { Component, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../animations';
import { UserService } from '../_services/user.service'
import { User } from '../_models/user';
import { SearchResult } from '../_models/searchresult';
import { Skill } from '../_models/skill'

@Component({
  moduleId: module.id,
  selector: 'home-component',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  animations: [slideInDownAnimation]
})

export class HomeComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  @HostBinding('style.left') left = '0';
  @HostBinding('style.right') right = '0';

  searchWords: Array<string> = [];
  searchPages: Array<Array<SearchResult>> = [];
  resultCount: number;
  pageNumber: number = 0;

  isSearching: boolean = false;
  hasSearched: boolean = false;

  filterArray: string[] = [];

  searchAssistant: boolean = false;

  allSkills: string[] = [];
  skillSearchResult: Array<string> = [];


  ngOnInit(): void {
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

  constructor(private _userService: UserService) {
  }

  search(searchString: string) {
    if (searchString.trim().length) {
      this.resultCount = 0;
      this.searchPages.splice(0, this.searchPages.length + 1);
      this.isSearching = true;
      this.searchWords = searchString.trim().split(" ");
      this._userService.searchStudents(this.searchWords).subscribe(
			result => {
        this.isSearching = false;
        while(result.length){
          this.searchPages.push(result.splice(0,6));
      }
        for(let page of this.searchPages){
            this.resultCount += page.length;
      }
        this.hasSearched = true;
			}, 
			err => {
        this.isSearching = false;

        }
      );
    }
  }

  addFilter(value: string, searchInput: HTMLInputElement) {

    searchInput.value += " "+value;
    
  }

  removeFilter(i: any) {
    this.filterArray.splice(i, 1);
  }

  clearFilter(searchInput: HTMLInputElement) {
    searchInput.value = "";
  }

  //SKILLS
   addSkill(skillInput: HTMLInputElement, searchInput: HTMLInputElement) {
        let value = skillInput.value;
        //Check for being empty, whitespace and duplicate
        searchInput.value += " "+value;
        skillInput.value = '';
    }

  findSkill(event: any) {
    let value = event.target.value.toLowerCase();

    // Check if input is empty
    if (value != "") {
      // For every skill in skillResult
      for (let result of this.allSkills) {

        let lowerResult = result.toLowerCase();


        // Check if result starts with the value of the input
        if (lowerResult.startsWith(value)) {

          // Check if the result exists in skillSearchResult
          if (!this.skillSearchResult.find(x => x == result)) {

            // Insert in array
            this.skillSearchResult.push(result);

            //console.log("SKILLSERACHRESLTWRT: " + this.skillSearchResult);


          }
        } else {

          if (this.skillSearchResult.find(x => x == result)) {

            this.skillSearchResult.splice(this.skillSearchResult.indexOf(result), 1);


          }
        }

      }
      this.skillSearchResult.splice(10, this.allSkills.length);

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

    chosenSkill(chosen: string, skillInput:HTMLInputElement, searchInput: HTMLInputElement) {

        searchInput.value += " "+chosen;

        this.skillSearchResult = []; // splice(this.skillSearchResult.indexOf(chosen), 1);

        // Input field empty
        skillInput.value = "";

    }

}

