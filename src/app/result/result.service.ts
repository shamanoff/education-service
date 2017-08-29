import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Result} from './result';
import {ResultsSet} from './resultsSet';
import {Http} from '@angular/http';

@Injectable()
export class ResultService {

  public resSet: FirebaseListObservable<ResultsSet[]>;
  public curRes: FirebaseListObservable<ResultsSet[]>;

  constructor(private _db: AngularFireDatabase, private _http: Http) {
    this.curRes = this._db.list('/results');
  }


  addResults(data) {
    console.log('data');
    console.log(data);
    return this._http.post('https://education-project-89f6a.firebaseio.com/results.json', data);
  }

  /*  getResultByKey(key){
      this.curRes = this._db.list('/results/' + key + '/  ') as
        FirebaseListObservable<Result[]>;
      return this.curRes;

    }*/


}
