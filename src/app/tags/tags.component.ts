import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Tag} from "./tag";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
public discipline$: FirebaseListObservable<Tag[]>;
  constructor(private _db: AngularFireDatabase) {
    this.discipline$ = this._db.list('/tags');
  }

  ngOnInit() {
  }

}
