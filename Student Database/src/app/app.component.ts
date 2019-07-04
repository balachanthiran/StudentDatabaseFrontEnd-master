import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent  { 

constructor(private _router: Router){
}

userID: string;

isLoggedIn(){
this.userID = localStorage.getItem('currentUserId');
	if(this.userID){
    return true;
  } 

	return false;
}

logout(){
	//remove user from local storage to log user out
  localStorage.removeItem('currentUserId');
}

}
