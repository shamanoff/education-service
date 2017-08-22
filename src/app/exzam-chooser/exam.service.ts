import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {FullExam} from "./fullExam";

@Injectable()
export class ExamService {

  public exam$: FirebaseListObservable<FullExam[]>;
  constructor(private _db: AngularFireDatabase) { }

  getExams() {
    this.exam$ = this._db.list('/exams') as
      FirebaseListObservable<FullExam[]>;
    return this.exam$;
  }

  addExam(data) {
    // return this.exam$.push(data);
    console.log('ADD ' + JSON.stringify(data));
  }
}
