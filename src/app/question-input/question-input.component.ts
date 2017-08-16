import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Tag} from '../tags/tag';
import {QuestionService} from "./question.service";

@Component({
  selector: 'app-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.scss']
})
export class QuestionInputComponent implements OnInit {

  questionInputForm: FormGroup;
  selectedTag: String;
  tag$: FirebaseListObservable<Tag[]>;
  constructor(public router: Router, private _db: AngularFireDatabase, private _questServ: QuestionService) {
    this.tag$ = this._db.list('/tags');
  }

  ngOnInit() {
    this.questionInputForm = new FormGroup({
      tag: new FormControl(),
      question: new FormControl(),
      answerOne: new FormControl(),
      answerTwo: new FormControl(),
      answerThree: new FormControl(),
      answerFour: new FormControl(),
      correctAnswer: new FormControl(false),

      })
  }
  onSubmit(formData){
    console.log('submit work');
    const data = {
      tag: formData.value.tag,
      question: formData.value.question,
      answerOne: formData.value.answerOne,
      answerTwo: formData.value.answerTwo,
      answerThree: formData.value.answerThree,
      answerFour: formData.value.answerFour,
      correctAnswer: formData.value.correctAnswer
    };
/*    if(formData.valid){
      this._questServ.addQuestion(data)
        .catch(error => console.log(error));
    }else console.log('not valid' + formData.valid);*/
    this._questServ.addQuestion(data);

    formData.reset();
  }

}
