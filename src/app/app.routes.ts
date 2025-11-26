import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BarsListComponent } from './bars-list/bars-list.component';
import { BarDetailComponent } from './bar-detail/bar-detail.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { RaceResultComponent } from './race-result/race-result.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pubs', component: BarsListComponent },
  { path: 'bar/:id', component: BarDetailComponent },
  { path: 'achievements', component: AchievementsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'race-result', component: RaceResultComponent },
  { path: '**', redirectTo: '' },
];
