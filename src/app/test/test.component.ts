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
    this._eS.getExamByKey(this.key).subscribe(  exam => {
      _.forEach(exam, function (e) {
        console.log(e.discipline, e.questionsCount);
        const dis: string = e.discipline;
        const count: string = e.questionsCount;
        if (dis != null) {
          this.question$ = this._db.list('/questions', {
            query: {
              orderByChild: 'tag',
              equalTo: dis,
            }
          });
        } else {
          this.question$ = this._db.list('/questions') as
            FirebaseListObservable<Question[]>;
        }
        this.question$.subscribe(quest => console.log(quest));
        return this.question$;
      });
    });
    // this._qS.getQuestions('Java');
    // this.listOfQuestionsFormer(this.key);
    // this.finalQuestionSet = this._qS.totalGen(this.key);

  }

  generateExam(){
    this.listOfQuestionsFormer();
  }

  listOfQuestionsFormer() {

    this.curExam.subscribe(
      exam => {
       _.forEach(exam, function (e) {
         console.log(e.discipline, e.questionsCount);
         const dis: string = e.discipline;
         const count: string = e.questionsCount;
         this._qS.getQuestions('Java');

       });
      }
    );
    /*console.log('FINAL 2');
    console.log(this.finalQuestionSet);*/

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
