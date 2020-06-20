import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProducsComponent } from './my-producs.component';

describe('MyProducsComponent', () => {
  let component: MyProducsComponent;
  let fixture: ComponentFixture<MyProducsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProducsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProducsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
