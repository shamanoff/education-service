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
  // public curExam: FirebaseListObservable<ExamSection[]>;
  // questionsIds: Array<string> = [];

  // qIds: Array<string> = [];
  // resQuest: Question;

  constructor(private _db: AngularFireDatabase, private _http: Http) {
  }

// -----------------------------


  /*
    totalGen(key): any{
      let curexam: FirebaseListObservable<ExamSection[]>;
      let questionsIds: Array<string> = [];
        curexam = this._db.list('/exams/' + key + '/examGroup')as
        FirebaseListObservable<ExamSection[]>;
      console.log(curexam);
      curexam.subscribe(
          exam => {
            _.forEach(exam, function (e) {
              console.log(e.discipline, e.questionsCount);
              const dis = e.discipline;
              const count = e.questionsCount;
  // ------------------------------------------------------------------------------
              this._db.list('/questions', {
                preserveSnapshot: true,
                query: {
                  orderByChild: 'tag',
                  equalTo: dis,

                },
              }).subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                  questionsIds.push(snapshot.key);
                  console.log(snapshot.key);
                });
                console.log('A ' + questionsIds);
                // ------------------------------------------
                console.log('randomizer');
                for (let i = 0; i < count; i++) {
                  const a = questionsIds[Math.floor(Math.random() * questionsIds.length)];
                  console.log('A '+ a);
                  this.qIds.push(a);
                }
                console.log('qIds ');
                console.log(this.qIds);
                // return this.qIds;
                // --------------------------------------
                const q = this.qIds.length;
                for (let i = 0; i < q; i++) {
                  const key = this.qIds[i];
                  console.log('KEY '+ key);
                  // -----------------------------------
                  // const quest = this.getQuestionById(key);
                  this._http.get('https://education-project-89f6a.firebaseio.com/questions/' + key + '.json',)
                    .subscribe((response: Response) => {
                        const resQuest = response.json();
                        this.finalQuestionSet.push(resQuest);

                      }, (error) => console.log(error)
                    );
                  // ---------------------------------------
                }
                console.log('FINAL 1');
                console.log(this.finalQuestionSet);
                // return this.finalQuestionSet;
                // return this.questionsIds;
              });




  // ------------------------------------------------------------------------------
            });
          }
        );
      // return this.finalQuestionSet;


    }
  */


  /*// getting array ids by tag
  getIdsArray(dis:string): any {
      console.log('getIdsArray');
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
        console.log('A ' + questionsIds);
        return questionsIds;
      });
  }*/

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

/*  getQuestionById(key): any {
    console.log('getQuestionById');

    this._http.get('https://education-project-89f6a.firebaseio.com/questions/' + key + '.json',)
      .subscribe((response: Response) => {
          let resQuest: Question = response.json();
          return resQuest;
        }, (error) => console.log(error)
      );

  }*/

  /*  getQuestionById(key) {
      console.log('getQuestionById');
      return this._db.object('/questions/' + key);

    }*/

  /*   getQuestionById(key) {
       console.log('getQuestionById');
       this._db.object('/questions/' + key, { preserveSnapshot: true } )
         .subscribe(snapshot => {
           console.log(snapshot.val)
         });
     }*/

  getQuestions(tag: string = null) {
    console.log('getQuestions');

    if (tag != null) {
      this.question$ = this._db.list('/questions', {
        query: {
          orderByChild: 'tag',
          equalTo: tag,
        }
      });
    } else {
      this.question$ = this._db.list('/questions') as
        FirebaseListObservable<Question[]>;
    }
    this.question$.subscribe(quest => console.log(quest));
    return this.question$;
  }

  /*  generator(dis, count): any {
      console.log('GENERATOR');
      this.getIdsArray(dis, count);
      // this.randomaizer(count);
  /!*    const q = this.qIds.length;
         for (let i = 0; i < q; i++) {
           const key = this.qIds[i];
           const quest = this.getQuestionById(key);
           this.finalQuestionSet.push(quest);
         }*!/
         return this.finalQuestionSet;
    }*/

  /*   getQuestions() {
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
