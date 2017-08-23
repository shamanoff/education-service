import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  key: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.key = this.route.snapshot.params['key'];
    // console.log(this.route.snapshot.toString());
  }

}
