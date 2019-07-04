import { Component, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../animations';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';

import { UserService } from '../_services/user.service';

@Component({
	moduleId: module.id,
	selector: 'login-component',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css'],
	animations: [ slideInDownAnimation ]
})
export class LoginComponent {
	@HostBinding('@routeAnimation') routeAnimation = true;
	@HostBinding('style.display') display = 'block';
	@HostBinding('style.position') position = 'absolute';
	@HostBinding('style.left') left = '0';
	@HostBinding('style.right') right = '0';

	constructor(private _router: Router, private http: Http,
		private _userService: UserService) {
	}

	isAuthorized: boolean = true;
	isLoading: boolean = false;
	loginError: string = "";
	emailError: string = "Please enter your e-mail";

	authorize(form: any) {
		if (form.valid) {
			this.isAuthorized = true;
			this.isLoading = true;
			this._userService.login(form.value.email, form.value.password)
				.subscribe(
				result => {
					if (result === true) {
						this.isLoading = false;
						console.log(localStorage.getItem('submitLater'+localStorage.getItem('currentUserId')));
						if(localStorage.getItem('submitLater'+localStorage.getItem('currentUserId')) == "true") this._router.navigate(['/additionalinfo']);
						else this._router.navigate(['']);
					} else {
						this.isAuthorized = false;
						this.isLoading = false;
						this.loginError = "Wrong e-mail or password"
					}
				},
				err => {
					this.isLoading = false;
					this.isAuthorized = false;
					this.loginError = "Network error"
					console.log("Error from login.authorize(): " + err);

				}
				);

		} else {
			if (form.controls.email.errors) {
				if (form.controls.email.errors.required) {
					this.emailError = "Please enter your e-mail";
				} else if (form.controls.email.errors.pattern) {
					this.emailError = "The e-mail is invalid";
				}
			}
		}

	}

}