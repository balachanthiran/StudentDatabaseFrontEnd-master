import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class LoginGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
        if (!localStorage.getItem('currentUserId')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['']);
        return false;
    }
}