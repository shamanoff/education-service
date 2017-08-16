import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Question} from './question';
import {Http} from '@angular/http';

@Injectable()
export class QuestionService {
  public questions: FirebaseListObservable<Question[]>;


  constructor(private _http: Http, private _db: AngularFireDatabase) {
  }

  getQuestions() {
    this.questions = this._db.list('/questions');
    return this.questions;
  }

  addQuestion(data) {
    return this.questions.push(data);
  }

  updateQuestion(key, updQuest) {
    return this.questions.update(key, updQuest);
  }

  deleteQuestion(key) {
    return this.questions.remove(key);
  }
}
