import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuestionInputComponent } from './question-input/question-input.component';
import { ExzamChooserComponent } from './exzam-chooser/exzam-chooser.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {routes} from './app.routes';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { TagsComponent } from './tags/tags.component';
import {QuestionService} from './question-input/question.service';

export const firebaseConfig = {
  apiKey: 'AIzaSyDN4lCRC7LfoRBHMowfX1eCGZFfl9HVR9U',
  authDomain: 'education-project-89f6a.firebaseapp.com',
  databaseURL: 'https://education-project-89f6a.firebaseio.com',
  projectId: 'education-project-89f6a',
  storageBucket: 'education-project-89f6a.appspot.com',
  messagingSenderId: '12790632812'
};
@NgModule({
  declarations: [
    AppComponent,
    QuestionInputComponent,
    ExzamChooserComponent,
    HeaderComponent,
    HomeComponent,
    TagsComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserModule,
    routes,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [QuestionService, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
