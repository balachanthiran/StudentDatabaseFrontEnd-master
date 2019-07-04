import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'pagenotfound-component',
  templateUrl: 'pagenotfound.component.html',
  styleUrls: ['pagenotfound.component.css']
})
export class PageNotFoundComponent  { 

constructor(private _router: Router){
}

}
