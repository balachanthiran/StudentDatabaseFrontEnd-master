import { Education } from '../_models/education';
import { Social } from '../_models/social';
import { Skill } from '../_models/skill';
import { Language } from '../_models/language';


export class AdditionalInfo {

    education: Education;
    social: Social;
    languages: Language[]; 
    skills: Skill[];   

}