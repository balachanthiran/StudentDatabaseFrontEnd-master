import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map'
import { User } from '../_models/user';
import { Skill } from '../_models/skill';
import { Language } from '../_models/language';
import { AdditionalInfo } from '../_models/additionalInfo';

@Injectable()
export class UserService {

    options = new RequestOptions({ 'headers': new Headers({ 'Content-Type': 'application/json' }) });

    constructor(private http: Http) {
    }

    login(email: string, password: string) {
        let body = JSON.stringify({Email: email, Password: password});
        return this.http.post('http://localhost:64792/api/authenticate', body, this.options)
            .map((response: Response) => {
                if(response.ok){
                    let userId = response.json();
                    if(userId>0){
                    localStorage.setItem('currentUserId', JSON.stringify(userId));
                    localStorage.setItem('submitLater' + localStorage.getItem('currentUserId'), "true");
 
                    // return true to indicate successful login
                    return true;
                }
                return false;
                }
            });
    }

    createAccount(newUser: User) {
        return this.http.post('http://localhost:64792/api/students', JSON.stringify(newUser), this.options)
            .map((response: Response) => {
                if (response.ok) {
                    console.log("Registration was a success");
                    return true;
                } else {
                    console.log("Registration failed");
                    return false;
                }
            });
    }

    searchStudents(searchWords: Array<string>) {
        // Parameters obj-
        let params: URLSearchParams = new URLSearchParams();
        for (let i = 0; i < searchWords.length; i++) {
            params.append('searchWords', searchWords[i]);
        }
        //Http request-
        return this.http.get('http://localhost:64792/api/students', { search: params })
            .map((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            });
    }

    getSingleUser(userID: number) {
        return this.http.get('http://localhost:64792/api/students/' + userID)
            .map((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return false;
                }
            });
    }

    getAllSkills() {
        return this.http.get('http://localhost:64792/api/skill')
            .map((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return false;
                }
            });
    }

    insertAdditionalInfo(info: AdditionalInfo) {
        return this.http.post('http://localhost:64792/api/additionalinfo', info, this.options)
            .map((response: Response) => {
                if (response.ok) {
                    console.log("Registration was a success");
                    return true;
                } else {
                    console.log("Registration failed");
                    return false;
                }
            });
    }

    insertImage(imageURL: string) {
        return this.http.put('http://localhost:64792/api/students/' +  localStorage.getItem('currentUserId'), JSON.stringify(imageURL) , this.options)
            .map((response: Response) => {
                if (response.ok) {
                    return true;
                } else {
                    return false;
                }
            });
    }

    getAdditionalInfo(userID: number){
        return this.http.get('http://localhost:64792/api/additionalinfo/' + userID)
            .map((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return false;
                }
            });
    }

    addSkill(newSkill: Skill){
           return this.http.post('http://localhost:64792/api/skill', newSkill, this.options)
            .map((response: Response) => {
                if (response.ok) {
                    return response.json();
                }
            });
    }

    deleteSkill(skillId: number){
        console.log(skillId);
        let params: URLSearchParams = new URLSearchParams();
            params.set('skillID', String(skillId));
         return this.http.delete('http://localhost:64792/api/skill/' + localStorage.getItem('currentUserId'), {search: params})
            .map((response: Response) => {
                if (response.ok) {
                    return true;
                } else {
                    return false;
                }
            });
    }

    updateSkill(skillID: number, newValue: string){
         return this.http.put('http://localhost:64792/api/skill/' +  localStorage.getItem('currentUserId'), {"skillID" : skillID, "newValue" : newValue} , this.options)
            .map((response: Response) => {
                if (response.ok) {
                    return true;
                } else {
                    return false;
                }
            });

    }

    addLanguage(newLanguage: Language){
        return this.http.post('http://localhost:64792/api/language', newLanguage, this.options)
            .map((response: Response) => {
                if (response.ok) {
                    return response.json();
                }
            });
    }

    deleteLanguage(languageID: number){
       let params: URLSearchParams = new URLSearchParams();
            params.set('languageID', String(languageID));
         return this.http.delete('http://localhost:64792/api/language/' + localStorage.getItem('currentUserId'), {search: params})
            .map((response: Response) => {
                if (response.ok) {
                    return true;
                } else {
                    return false;
                }
            });
    }

    updateLanguage(languageID: number, newValue: string){
              return this.http.put('http://localhost:64792/api/language/' +  localStorage.getItem('currentUserId'), {"languageID" : languageID, "newValue" : newValue} , this.options)
            .map((response: Response) => {
                if (response.ok) {
                    return true;
                } else {
                    return false;
                }
            });
    }

    updateEducation(faculty: string, study: string){
           return this.http.put('http://localhost:64792/api/education/' +  localStorage.getItem('currentUserId'), {"faculty" : faculty, "study" : study} , this.options)
            .map((response: Response) => {
                if (response.ok) {
                    return true;
                }
                return false;
            });
    }

    updateSocial(facebook: string, linkedin: string){
           return this.http.put('http://localhost:64792/api/social/' +  localStorage.getItem('currentUserId'), {"facebook" : facebook, "linkedin" : linkedin} , this.options)
            .map((response: Response) => {
                if (response.ok) {
                    return true;
                }
                return false;
            });
    }
}