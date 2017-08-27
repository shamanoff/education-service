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
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public finalQuestionSet: Array<Question> = [];


  public mapEx: Map<string, string> = new Map<string, string>();

  public curExam: FirebaseListObservable<ExamSection[]>;

  public question$: FirebaseListObservable<Question[]>;

  key: string;


  constructor(private route: ActivatedRoute,
              private _db: AngularFireDatabase,
              private _qS: QuestionService,
              private _eS: ExamService) {
    this.key = this.route.snapshot.params['key'];
    console.log(this.key + ' KEY');
    // this.curExam = this._eS.getExamByKey(this.key);
    this.listOfQuestionsFormer();

    // this._qS.getQuestions('Java');
    // this.listOfQuestionsFormer(this.key);
    // this.finalQuestionSet = this._qS.totalGen(this.key);

  }

  generateExam() {
    // this.listOfQuestionsFormer();
  }

  print(x) {
    console.log(x);
    return x;
  }

  listOfQuestionsFormer() {
    const exam = this._eS.getExamByKey(this.key);
    console.log('Ex');
    // exam.subscribe(ex => console.log(ex));

    exam.subscribe(ex => {
      console.log(ex);

      for( let i: number = 0; i < ex.length; i++) {
        let a = _.assign({discipline: '', questionsCount: ''}, ex[i] );
        console.log(a.discipline, a.questionsCount)
        // console.log(ex[i].discipline)
        // let {discipline, questionsCount} = ex[i];


        // let _discipline = ex[i].discipline;
        // let _questionsCount = ex[i-1].questionsCount;

        // this._qS.getIdsArray( _discipline, _questionsCount);
      }
    });

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
