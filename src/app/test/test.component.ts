import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../question-input/question';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {QuestionService} from '../question-input/question.service';
import {FullExam} from '../exzam-chooser/fullExam';
import {ExamService} from '../exzam-chooser/exam.service';
import {Response} from '@angular/http';
import {ExamSection} from '../exzam-chooser/examSection';
import * as _ from 'lodash';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  curExam: FirebaseListObservable<ExamSection[]>;
public idAr: string[]=[];
  question$: FirebaseListObservable<Question[]>;
  // curExam: FirebaseObjectObservable<FullExam>;
  httpExam: FullExam;
  key: string;


  constructor(private route: ActivatedRoute,
              private _db: AngularFireDatabase,
              private _qS: QuestionService,
              private _eS: ExamService) {
    this.key = this.route.snapshot.params['key'];
    this.question$ = this._qS.getQuestions();
    console.log(this.key + ' KEY');
    this.getCurExamByKey(this.key);
    this.idAr = this._qS.getIdsArray('Java');
    console.log(this.idAr)
    // this.curExam = this._eS.getExamByKey(this.key);
    // this.httpExam = this._eS.getExamByKey(this.key);
    // this.onGet(this.key);

  }

  exGen() {
    this.curExam.subscribe(
      (v) => {
        console.log(v);
      }
    );
  }

  getCurExamByKey(key) {

    this.curExam = this._eS.getExamByKey(key);
  }


  /*
    onGet(key) {
      this._eS.getExamByKey(key)
        .subscribe(
          (response: Response) => {
            this.httpExam = response.json();

            console.log(this.httpExam);
          }, (error) => console.log(error)
        );
    }
  */

  ngOnInit() {
  }

}
