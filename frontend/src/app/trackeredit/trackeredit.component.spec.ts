import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackereditComponent } from './trackeredit.component';

describe('TrackereditComponent', () => {
  let component: TrackereditComponent;
  let fixture: ComponentFixture<TrackereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
