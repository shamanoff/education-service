import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Tag} from '../tags/tag';
import {QuestionService} from './question.service';
import 'rxjs/add/operator/debounceTime';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.scss']
})
export class QuestionInputComponent implements OnInit {

  questionInputForm: FormGroup;
  selectedTag = '';
  reqErrMsg = '';
  tagMsg = '';
  tag$: FirebaseListObservable<Tag[]>;
  private validationMessages = {
    required: 'This field is required',


  };

  constructor(public router: Router,
              private _db: AngularFireDatabase,
              private _fb: FormBuilder,
              private _questServ: QuestionService) {

    this.tag$ = this._db.list('/tags');
  }

  ngOnInit() {
    this.questionInputForm = this._fb.group({
      tag: ['', [Validators.required]],
      questionInput: ['', [Validators.required]],
      answerOne: ['', [Validators.required]],
      answerTwo: ['', [Validators.required]],
      answerThree: ['', [Validators.required]],
      answerFour: ['', [Validators.required]],
      correctAnswer: ['', [Validators.required]],

    });
    const tagControl = this.questionInputForm.get('tag');
    tagControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setTagMsg(tagControl)
      );
    const questControl = this.questionInputForm.get('questionInput');
    questControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setQuestionInputMsg(questControl)
      );

    const answerOneControl = this.questionInputForm.get('answerOne');
    answerOneControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setAnswerOneMsg(answerOneControl)
      );
    const answerTwoControl = this.questionInputForm.get('answerTwo');
    answerTwoControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setAnswerTwoMsg(answerTwoControl)
      );
    const answerThreeControl = this.questionInputForm.get('answerThree');
    answerThreeControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setAnswerThreeMsg(answerThreeControl)
      );
    const answerFourControl = this.questionInputForm.get('answerFour');
    answerFourControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setAnswerFourMsg(answerFourControl)
      );

    const correctAnswerControl = this.questionInputForm.get('correctAnswer');
    correctAnswerControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setCorrectAnswerMsg(correctAnswerControl)
      );
  }


  setTagMsg(c: AbstractControl): void {
    this.tagMsg = '';
    if (c.errors) {
      this.reqErrMsg = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setQuestionInputMsg(c: AbstractControl): void {
    this.reqErrMsg = '';
    if (c.errors) {
      this.reqErrMsg = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setAnswerOneMsg(c: AbstractControl): void {
    this.reqErrMsg = '';
    if (c.errors) {
      this.reqErrMsg = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setAnswerTwoMsg(c: AbstractControl): void {
    this.reqErrMsg = '';
    if (c.errors) {
      this.reqErrMsg = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setAnswerThreeMsg(c: AbstractControl): void {
    this.reqErrMsg = '';
    if (c.errors) {
      this.reqErrMsg = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setAnswerFourMsg(c: AbstractControl): void {
    this.reqErrMsg = '';
    if (c.errors) {
      this.reqErrMsg = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setCorrectAnswerMsg(c: AbstractControl): void {
    this.reqErrMsg = '';
    if (c.errors) {
      this.reqErrMsg = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }


  onSubmit(formData) {
    console.log('submit work');
    const data = {
      tag: formData.value.tag,
      questionInput: formData.value.questionInput,
      answerOne: formData.value.answerOne,
      answerTwo: formData.value.answerTwo,
      answerThree: formData.value.answerThree,
      answerFour: formData.value.answerFour,
      correctAnswer: formData.value.correctAnswer
    };
    // console.log(data);
/*    if (formData.valid) {
      this._questServ.addQuestion(data)
        .catch(error => console.log(error));
    } else console.log('not valid' + formData.valid);*/
    this._questServ.addQuestion(data);

    formData.reset();
  }

}
