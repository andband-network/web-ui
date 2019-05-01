import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModalDialogComponent } from './confirmation-modal-dialog.component';

describe('ConfirmationModalDialogComponent', () => {
  let component: ConfirmationModalDialogComponent;
  let fixture: ComponentFixture<ConfirmationModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
