import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Question} from './question';

@Injectable()
export class QuestionService {
  public question$: FirebaseListObservable<Question[]>;

  constructor( private _db: AngularFireDatabase) {
  }

  getQuestions() {
    this.question$ = this._db.list('/questions');
    return this.question$;
  }

  addQuestion(data) {
    return this.question$.push(data);
    // console.log('ADD ' + JSON.stringify(data));
  }

  updateQuestion(key, updQuest) {
    return this.question$.update(key, updQuest);
  }

  deleteQuestion(key) {
    return this.question$.remove(key);
  }
}
