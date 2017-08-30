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

    this._questServ.addQuestion(data);

    formData.reset();
  }

}
