import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Question} from '../question-input/question';
import {Router} from '@angular/router';
import {QuestionService} from '../question-input/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  question$: FirebaseListObservable<Question[]>;

  constructor(public router: Router,
              private _db: AngularFireDatabase,
              private _qs: QuestionService) {
    this.question$ = this._qs.getQuestions();
  }

  ngOnInit() {
  }

}
