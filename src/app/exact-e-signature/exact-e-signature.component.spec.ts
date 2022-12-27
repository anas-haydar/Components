import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExactESignatureComponent } from './exact-e-signature.component';

describe('ExactESignatureComponent', () => {
  let component: ExactESignatureComponent;
  let fixture: ComponentFixture<ExactESignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExactESignatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExactESignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
