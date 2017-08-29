import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  public userAnswers: Array<string> = [];

  constructor(private route: ActivatedRoute,
              public router: Router,
              private _db: AngularFireDatabase,
              private _qS: QuestionService,
              private _eS: ExamService) {
    this.key = this.route.snapshot.params['key'];
    console.log(this.key + ' KEY');
    this.curExam = this._eS.getExamByKey(this.key);
    this.listOfQuestionsFormer();

    // this._qS.getQuestions('Java');
    // this.listOfQuestionsFormer(this.key);
    // this.finalQuestionSet = this._qS.totalGen(this.key);

  }

  setUserAnswer(i, select){
    this.userAnswers[i] = select;
    console.log('i, select');
    console.log(this.userAnswers);
  }

  print(x) {
    console.log(x);
    return x;
  }

  listOfQuestionsFormer() {
    const exam = this._eS.getExamByKey(this.key);
    console.log('Ex');
    exam.subscribe(ex => {
      for (let i = 0; i < ex.length; i++) {
        const a = _.assign({discipline: '', questionsCount: ''}, ex[i]);
        // console.log(a.discipline, a.questionsCount)
        this.finalQuestionSet = this._qS.getTotal(a.discipline, a.questionsCount);

      }
    });

  }

  findExamById(key){
    this.router.navigate(['/test/'+ key.target.value], {relativeTo: this.route});
  }
  saveExam(){

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
