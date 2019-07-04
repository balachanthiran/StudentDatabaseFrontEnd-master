import { User } from '../_models/user';
import { Education } from '../_models/education';
import { Skill } from '../_models/skill';
import { Language } from '../_models/language';


export class SearchResult {
	
    user: User;
    education: string;
    skills: string[];   
    languages: string[]; 
    
}