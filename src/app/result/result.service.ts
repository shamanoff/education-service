import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Result} from "./result";
import {ResultsSet} from "./resultsSet";

@Injectable()
export class ResultService {

  public resSet:FirebaseListObservable<ResultsSet[]>;
  public curRes:FirebaseListObservable<ResultsSet[]>;
  constructor(private _db: AngularFireDatabase,) {
    this.curRes = this._db.list('/results');
  }


  addResults(data) {
    console.log('data');
    console.log(data);
    const temp: ResultsSet = data;
    return this.resSet.push(data).key;
  }
/*  getResultByKey(key){
    this.curRes = this._db.list('/results/' + key + '/  ') as
      FirebaseListObservable<Result[]>;
    return this.curRes;

  }*/


}
