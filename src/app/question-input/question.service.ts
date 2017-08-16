import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Question} from "./question";
import {Http} from "@angular/http";

@Injectable()
export class QuestionService {
  public question$: FirebaseListObservable<Question[]>;


  constructor(private _http: Http,  private _db: AngularFireDatabase) {
  }

  getQuestions(){
    this.question$ = this._db.list('/questions');
    return this.question$;
  }

  addQuestion(newQuestion){
    return this.question$.push(newQuestion);
  }

  updateQuestion(key, updQuest){
    return this.question$.update(key, updQuest);
  }

  deleteQuestion(key){
    return this.question$.remove(key);
  }
}
