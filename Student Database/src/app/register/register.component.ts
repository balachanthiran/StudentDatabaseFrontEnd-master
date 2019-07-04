import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../animations';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({
  moduleId: module.id,
  selector: 'register-component',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  animations: [ slideInDownAnimation ]
})
export class RegisterComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  @HostBinding('style.left') left = '0';
  @HostBinding('style.right') right = '0';

  isLoading: boolean = false;
  networkError: boolean = false;

  constructor(private _userService: UserService, private _router: Router) {
  }

  register(form: any) {
    this.isLoading = true;
    this.networkError = false;
    console.log(this.isLoading);

    let newUser: User = {
      firstname: form.firstname, lastname: form.lastname, email: form.email, password: form.password, gender: form.gender,
      birthday: form.birthday, city: form.city, nationality: form.nationality
    };

    this._userService.createAccount(newUser)
      .subscribe(
      result => {
        if (result === true) {
          //inform user that it was a success
          this._router.navigate(['/login']);
        }
        else {
          //inform user that it was a failure
        }
      },
      err => {
        console.log("Error in register component: " + err);
        this.isLoading = false;
        this.networkError = true;
      }
      )

  }

}