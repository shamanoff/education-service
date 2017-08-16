import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Tag} from '../tags/tag';

@Component({
  selector: 'app-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.scss']
})
export class QuestionInputComponent implements OnInit {

  questionInputForm: FormGroup;
  selectedTag: String;
  tag$: FirebaseListObservable<Tag[]>;
  constructor(public router: Router, private _db: AngularFireDatabase) {
    this.tag$ = this._db.list('/tags');
  }

  ngOnInit() {
    this.questionInputForm = new FormGroup({
      tag: new FormControl(),
      questionInput: new FormControl(),
      answerOne: new FormControl(),
      answerTwo: new FormControl(),
      answerThree: new FormControl(),
      answerFour: new FormControl(),
      one: new FormControl(false),
      two: new FormControl(true),
      three: new FormControl(false),
      four: new FormControl(false),
      })
  }
  onSubmit(formData){
  }

}
