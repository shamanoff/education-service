import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Router} from '@angular/router';
import {QuestionService} from '../question-input/question.service';
import {Tag} from '../tags/tag';
import {Question} from '../question-input/question';
import {element} from 'protractor';
import {FormBuilder, FormGroup} from '@angular/forms';

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

  constructor(public router: Router,
              private _db: AngularFireDatabase,
              private _qs: QuestionService,
              private _fb: FormBuilder,
  ) {
    this.question$ = this._qs.getQuestions();
    this.tag$ = this._db.list('/tags');

  }

  ngOnInit() {
    this._db.list('/questions',
    { preserveSnapshot: true })
       .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.questionsIds.push(snapshot.key);
          // console.log(snapshot.key, snapshot.val());
        });
      }
    );
console.log(this.questionsIds);
  }

  onSubmit(formData){

  }
}
