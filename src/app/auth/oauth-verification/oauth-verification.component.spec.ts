import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuthVerificationComponent } from './oauth-verification.component';

describe('OAuthVerificationComponent', () => {
  let component: OAuthVerificationComponent;
  let fixture: ComponentFixture<OAuthVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OAuthVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OAuthVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
