import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {QuestionInputComponent} from "./question-input/question-input.component";
import {ExzamChooserComponent} from "./exzam-chooser/exzam-chooser.component";
import {HomeComponent} from "./home/home.component";
import {TestComponent} from './test/test.component';
// import { EmailComponent } from './email/email.component';

export const router: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'home', redirectTo: ''},
  {path: 'question', component: QuestionInputComponent},
  {path: 'exam', component: ExzamChooserComponent},
  {path: 'test', component: TestComponent},
  {path: 'test/:key', component: TestComponent},


];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
