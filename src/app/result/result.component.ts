import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Result} from './result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

public result$: FirebaseListObservable<Result[]>;
  key: string;
  error:boolean =  false;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private _db: AngularFireDatabase) {
    this.key = '';
    this.key = this.route.snapshot.params['key'];
    this.result$ = this._db.list('/results/' + this.key);
    this.result$.subscribe(
      res=> console.log(res)
    )
  }

  ngOnInit() {
  }

  findResultById(key) {
    if(key.target.validity.valid) {
      this.router.navigate(['/result/' + key.target.value], {relativeTo: this.route});
    }else this.error = true;
  }
}
