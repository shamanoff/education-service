import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Tag} from "./tag";

@Injectable()
export class TagService {

  public discipline$: FirebaseListObservable<Tag[]>;
  constructor(private _db: AngularFireDatabase) { }

  getDis(){
    return this.discipline$ = this._db.list('/tags') as FirebaseListObservable<Tag[]>;
  }

  addDis(data){
    this.discipline$.push(data);
  }

  updateDis(key, data){
    this.discipline$.update(key, data);
  }

  deleteDis(key){
    this.discipline$.remove(key);
  }

}
