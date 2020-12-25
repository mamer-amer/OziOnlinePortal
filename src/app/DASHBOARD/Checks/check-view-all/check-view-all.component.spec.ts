import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckViewAllComponent } from './check-view-all.component';

describe('CheckViewAllComponent', () => {
  let component: CheckViewAllComponent;
  let fixture: ComponentFixture<CheckViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckViewAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
