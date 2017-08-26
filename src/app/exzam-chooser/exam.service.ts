import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {FullExam} from './fullExam';
import {Http, Response} from '@angular/http';
import {ExamSection} from './examSection';
import * as _ from 'lodash';

@Injectable()
export class ExamService {
  mapCount: Array<ExamSection> = [];
  httpExam: FullExam;
  public curExam: FirebaseListObservable<ExamSection[]>;
  public exam$: FirebaseListObservable<FullExam[]>;

  constructor(private _db: AngularFireDatabase,
              private _http: Http) {
    this.exam$ = this._db.list('/exams') as
      FirebaseListObservable<FullExam[]>;
  }

  getExams() {
    this.exam$ = this._db.list('/exams') as
      FirebaseListObservable<FullExam[]>;
    return this.exam$;
  }

    getExamByKey(key){
      this.curExam = this._db.list('/exams/' + key + '/examGroup') as
        FirebaseListObservable<ExamSection[]>;
      return this.curExam;

    }
/*  getExamByKey(key): any {
    return this._http.get('https://education-project-89f6a.firebaseio.com/exams/' + key + '.json');
  }*/



  addExam(data) {
    return this.exam$.push(data).key;
  }
}
