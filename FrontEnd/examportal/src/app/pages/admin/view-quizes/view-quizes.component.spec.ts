import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizesComponent } from './view-quizes.component';

describe('ViewQuizesComponent', () => {
  let component: ViewQuizesComponent;
  let fixture: ComponentFixture<ViewQuizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuizesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
