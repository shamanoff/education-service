import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Question} from '../question-input/question';
import {Router} from '@angular/router';
import {QuestionService} from '../question-input/question.service';
import {Tag} from '../tags/tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filteredStatus = '';
  tag$: FirebaseListObservable<Tag[]>;

  question$: FirebaseListObservable<Question[]>;

  constructor(public router: Router,
              private _db: AngularFireDatabase,
              private _qs: QuestionService) {
    this.question$ = this._qs.getQuestions();
    this.tag$ = this._db.list('/tags');

  }

  ngOnInit() {
  }

  deleteQuestion(key) {
    this.question$.remove(key);
  }

  /*
    filterDiscipline(discipline) {
      console.log('filter work ' + discipline);


    }
  */

}
