import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../question-input/question';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {QuestionService} from '../question-input/question.service';
import {FullExam} from '../exzam-chooser/fullExam';
import {ExamService} from '../exzam-chooser/exam.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
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
    // this.curExam = this._eS.getExamByKey(this.key);
    // this.httpExam = this._eS.getExamByKey(this.key);
    this.onGet(this.key);
    console.log('constructor work!');

  }

  onGet(key) {
    this._eS.getExamByKey(key)
      .subscribe(
        (response: Response) => {
          this.httpExam = response.json();
          console.log(this.httpExam);
        }
      );
  }

  ngOnInit() {


  }

}
