import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Result} from "./result";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {


  key: string;
  constructor(private route: ActivatedRoute,
              public router: Router,
              private _db: AngularFireDatabase) {
    this.key = this.route.snapshot.params['key'];

  }

  ngOnInit() {
  }
  findResultById(){

  }
}
