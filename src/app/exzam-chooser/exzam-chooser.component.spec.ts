import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExzamChooserComponent } from './exzam-chooser.component';

describe('ExzamChooserComponent', () => {
  let component: ExzamChooserComponent;
  let fixture: ComponentFixture<ExzamChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExzamChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExzamChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
