import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Question} from './question';

@Injectable()
export class QuestionService {
  public question$: FirebaseListObservable<Question[]>;
  questionsIds: Array<string> = [];

  constructor( private _db: AngularFireDatabase) {
  }

  getQuestions(tag: string = null) {
    if (tag != null) {
      this.question$ = this._db.list('/questions', {
        query: {
          // limitToLast: (10),
          //
          orderByChild: 'tag',
          equalTo: tag,
          preserveSnapshot: true
        }
      });
    } else {
      this.question$ = this._db.list('/questions', {
        query: {
          // limitToLast: (10),

          // orderByChild: 'tag',
          // equalTo: tag
        }
      }) as
        FirebaseListObservable<Question[]>;
    }

    return this.question$;
  }

  getIdsArray(tag): any {
    this._db.list('/questions', {
      preserveSnapshot: true,
      query: {
        orderByChild: 'tag',
        equalTo: tag,

      },
    }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.questionsIds.push(snapshot.value);
        console.log(snapshot.key);
      });

      return this.questionsIds;
    });
  }

 /* getQuestions() {
    this.question$ = this._db.list('/questions') as
      FirebaseListObservable<Question[]>;
    return this.question$;
  }*/

  addQuestion(data) {
    return this.question$.push(data);
    // console.log('ADD ' + JSON.stringify(data));
  }

  updateQuestion(key, updQuest) {
    return this.question$.update(key, updQuest);
  }

  deleteQuestion(key) {
    return this.question$.remove(key);
  }
}
