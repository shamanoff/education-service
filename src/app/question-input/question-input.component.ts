import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Tag} from '../tags/Tag';

@Component({
  selector: 'app-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.scss']
})
export class QuestionInputComponent implements OnInit {

  questionInputForm: FormGroup;
  selectedTag: String;
  tag$: FirebaseListObservable<Tag[]>;
  constructor(public router: Router, private _db: AngularFireDatabase) { }

  ngOnInit() {
  }
  onSubmit(formData){
  }

}
