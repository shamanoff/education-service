import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Router} from '@angular/router';
import {QuestionService} from '../question-input/question.service';
import {Tag} from '../tags/tag';
import {Question} from '../question-input/question';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FullExam} from './fullExam';
import * as _ from "lodash";
import {ExamSection} from './examSection';
import {ExamService} from "./exam.service";

@Component({
  selector: 'app-exzam-chooser',
  templateUrl: './exzam-chooser.component.html',
  styleUrls: ['./exzam-chooser.component.scss']
})
export class ExzamChooserComponent implements OnInit {
  examForm: FormGroup;
  tag$: FirebaseListObservable<Tag[]>;
  questionsIds: Array<string> = [];
  question$: FirebaseListObservable<Question[]>;
  exam$: FirebaseListObservable<FullExam[]>;
  currentExam: FullExam;

  constructor(public router: Router,
              private _db: AngularFireDatabase,
              private _qs: QuestionService,
              private _fb: FormBuilder,
              private _exS: ExamService) {
    this.question$ = this._qs.getQuestions();
    this.tag$ = this._db.list('/tags');

  }

  buildExams(): FormGroup {
    return this._fb.group({
      discipline: ['', [Validators.required]],
      questionsCount: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

    this.examForm = this._fb.group({
      examGroup: this._fb.array([this.buildExams()])
    });

    /*    this._db.list('/questions',
        { preserveSnapshot: true })
           .subscribe(snapshots => {
            snapshots.forEach(snapshot => {
              this.questionsIds.push(snapshot.key);
              // console.log(snapshot.key, snapshot.val());
            });
          }
        );
    console.log(this.questionsIds);*/
  }

  get examGroup(): FormArray {
    return <FormArray>this.examForm.get('examGroup');
  }

  addExamSet(): void {
    this.examGroup.push(this.buildExams());
  }

  getProp(data: FullExam) {
    // let curMap : { [key:string]:string; } = {};
    this.currentExam = data;

  }

  onSubmit(formData) {

    const p = Object.assign({}, this.currentExam, formData.value);
    console.log(p);
    this._exS.addExam(p);

    // this.exam$.push(p);
    this.examForm.reset();
  }
}
