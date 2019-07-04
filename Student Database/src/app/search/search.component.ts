import { Component, Input, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { SearchResult } from '../_models/searchresult';

@Component({
  moduleId: module.id,
  selector: 'search-component',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit {
@Input() searchPages: Array<Array<SearchResult>>;
@Input() resultCount: number;

ngOnInit(): void {

this._userService.getSingleUser(parseInt(localStorage.getItem('currentUserId'))).subscribe(
        result => {
            this.currentUser = result;
        },
        err => {
            console.log("Error in ngOnInit: " + err);
        }
    )
}

contactArray: Array<User> = [];
currentUser: User;


constructor(private _router: Router, private _userService: UserService){
}

currentPage: number = 0;

setPage(index: number){
    this.currentPage = index;
}

sendMail(user: User){
    window.location.href = "mailto:" + user.email + ";?subject=" + "I%20need%20your%20assistance" + 
    "&body=Hello%20" + user.firstname + "%20" + user.lastname + ",%0D%0A%0D%0APlease%20help%20me%0D%0A%0D%0AKind%20regards,%0D%0A%0D%0A" + 
    this.currentUser.firstname + "%20" + this.currentUser.lastname;
}

contactAll(){
    let contactString: string = "";
    for(let user of this.contactArray){
        contactString += user.email + ";";
    }
    window.location.href = "mailto:" + contactString + "?subject=" + "I%20need%20your%20assistance" + 
    "&body=Hello%20everyone,%0D%0A%0D%0APlease%20help%20me%0D%0A%0D%0AKind%20regards,%0D%0A%0D%0A" + 
    this.currentUser.firstname + "%20" + this.currentUser.lastname;
}

viewProfile(index: number){
    this._router.navigate(["/profile/" + index]);
}

checkProfile(checkbox: HTMLInputElement, contact: User){
    if(checkbox.checked){
        this.contactArray.push(contact);
    } else{
        this.contactArray.splice(this.contactArray.indexOf(contact), 1);
    }
}

}