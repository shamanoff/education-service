import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Tag} from './tag';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TagService} from './tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  onAdding = false;
  onUpdating = false;
  disInputForm: FormGroup;
  public discipline$: FirebaseListObservable<Tag[]>;

  constructor(private _db: AngularFireDatabase,
              private _fb: FormBuilder,
              private _tS: TagService) {
    this.discipline$ = this._db.list('/tags');
  }

  ngOnInit() {
    this.disInputForm = this._fb.group({
      name: ['', [Validators.required]]
    });
  }

  close() {
    this.onAdding = false;
  }

  open() {
    this.onAdding = true;
  }

  onAdd(data) {
    const d = {
      name: data.value.name
    };
    this._tS.addDis(d);
    this.disInputForm.reset();
    this.onAdding = false;
  }

  onDelete(key) {
    this._tS.deleteDis(key);
  }

  onUpdate() {

  }
}
