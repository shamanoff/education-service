import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {FullExam} from './fullExam';
import {promise} from 'selenium-webdriver';

@Injectable()
export class ExamService {

  curExam: FirebaseObjectObservable<FullExam>;
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

  getExamByKey(key){
    this.curExam = this._db.object('/exams/'+ key, { preserveSnapshot: true }) as
      FirebaseObjectObservable<FullExam>;
    return this.curExam;

  }

  addExam(data) {
      return this.exam$.push(data).key;
  }
}
