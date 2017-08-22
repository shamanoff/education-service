import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FullExam} from './fullExam';
import {promise} from 'selenium-webdriver';

@Injectable()
export class ExamService {

  public exam$: FirebaseListObservable<FullExam[]>;

  constructor(private _db: AngularFireDatabase) {
    this.exam$ = this._db.list('/exams') as
      FirebaseListObservable<FullExam[]>;
  }

  getExams() {
    this.exam$ = this._db.list('/exams') as
      FirebaseListObservable<FullExam[]>;
    return this.exam$;
  }

  addExam(data) {
    let k = this.exam$.push(data).key;

    console.log(k);
    return k;
    // console.log('ADD ' + JSON.stringify(data));
  }
}
