import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';


import { RouteReuseStrategy } from "@angular/router"; 
import { CustomReuseStrategy } from "./_models/CustomReuseStrategy";

import { AppComponent }  from './app.component';
import { HomeComponent }  from './home/home.component';
import { SearchComponent }  from './search/search.component';
import { LoginComponent }  from './login/login.component';
import { AdditionalInfoComponent} from './additionalinfo/additionalinfo.component';
import { ProfileComponent }  from './profile/profile.component';
import { RegisterComponent }  from './register/register.component';
import { SettingsComponent }  from './settings/settings.component';
import { PageNotFoundComponent }  from './pagenotfound/pagenotfound.component';
  import { GeneralSettingsComponent } from './settings/generalsettings/generalsettings.component';
  import { NotificationSettingsComponent } from './settings/notificationsettings/notificationsettings.component';
  
import { UserService } from './_services/user.service';
import { HomeGuard } from './_guards/home.guard';
import { LoginGuard } from './_guards/login.guard';

@NgModule({
  imports: [BrowserModule,
            FormsModule,
            HttpModule,
  				  RouterModule.forRoot([
            { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
            { path: 'register', component: RegisterComponent },
            { path: 'additionalinfo', component: AdditionalInfoComponent, canActivate: [HomeGuard] },
  			    { path: '', component: HomeComponent, canActivate: [HomeGuard] },
            { path: 'profile/:id', component: ProfileComponent, canActivate: [HomeGuard] },
            { path: 'pagenotfound', component: PageNotFoundComponent},
            { path: 'settings', component: SettingsComponent, canActivate: [HomeGuard],
              children: [
                { path: '', redirectTo: 'general', pathMatch: 'full' },
                { path: 'general', component: GeneralSettingsComponent },
                { path: 'notifications', component: NotificationSettingsComponent }
              ]
            },
            { path: '**', redirectTo: 'pagenotfound' },	
  				  ])
  				],
  declarations: [ AppComponent,
  				  HomeComponent,
            SearchComponent,
  				  LoginComponent,
            RegisterComponent,
            AdditionalInfoComponent,
            ProfileComponent,
            SettingsComponent,
            GeneralSettingsComponent,
            NotificationSettingsComponent,
            PageNotFoundComponent 
  				],

   providers: [UserService,
               HomeGuard,
               LoginGuard,
               {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
              ],

  bootstrap:    [ AppComponent ]
})
export class AppModule { }