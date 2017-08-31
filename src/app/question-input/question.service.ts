import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Question} from './question';
import {Http, Response} from '@angular/http';
import {ExamSection} from '../exzam-chooser/examSection';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class QuestionService {

  public question$: FirebaseListObservable<Question[]>;

  public finalQuestionSet: Array<Question> = [];


  constructor(private _db: AngularFireDatabase, private _http: Http) {
  }

// -----------------------------




// getting array ids by tag


  getTotal(dis: string, count: string): any {
    console.log('getIdsArray');
    this.finalQuestionSet =  [];
    const questionsIds: Array<string> = [];

    this._db.list('/questions', {
      preserveSnapshot: true,
      query: {
        orderByChild: 'tag',
        equalTo: dis,
      },
    }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        questionsIds.push(snapshot.key);
        // console.log(snapshot.key);
      });
      // console.log('A ' + questionsIds);
      const ids = this.randomaizer(count, questionsIds);
      // console.log(ids);
      // return questionsIds;
      for (let i = 0; i < ids.length; i++) {
      // console.log(ids[i] + 'IDs');
     // -----------------------------------------------
        this._http.get('https://education-project-89f6a.firebaseio.com/questions/' + ids[i] + '.json')
          .subscribe((response: Response) => {
              const resQuest: Question = response.json();
              // тут возможно нужно добавить айди в объект
              // return resQuest;
            this.finalQuestionSet.push(resQuest);
            }, (error) => console.log(error)
          );

      }
    });
    // console.log('finalQuestionSet');
    // console.log(this.finalQuestionSet);
    return this.finalQuestionSet;
  }






  randomaizer(count, questionsIds): any {
    console.log('randomizer');
    const qIds: Array<string> = [];
    for (let i = 0; i < count; i++) {
      const a = questionsIds[Math.floor(Math.random() * questionsIds.length)];
      qIds.push(a);
    }
    return qIds;
  }



  getQuestions(tag: string = null) {
    // console.log('getQuestions');

    if (tag != null) {
      this.question$ = this._db.list('/questions', {
        query: {
          orderByChild: 'tag',
          equalTo: tag,
        }
      });
    } else {
      this.question$ = this._db.list('/questions').map((array) => array.reverse()) as
        FirebaseListObservable<Question[]>;
    }
    // this.question$.subscribe(quest => console.log(quest));
    return this.question$;
  }



  addQuestion(data) {
    return this.question$.push(data);
    // console.log('ADD ' + JSON.stringify(data));
  }


}
