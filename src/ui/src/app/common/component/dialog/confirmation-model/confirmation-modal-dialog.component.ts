import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-modal-dialog.component.html',
  styleUrls: ['./confirmation-modal-dialog.component.scss']
})
export class ConfirmationModalDialogComponent implements OnInit {

  messageText: string;
  buttonText: string;

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any, private dialogRef: MatDialogRef<ConfirmationModalDialogComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.messageText = this.dialogData.messageText;
    this.buttonText = this.dialogData.buttonText;
  }

  ok() {
    this.dialogRef.close();
  }

}
