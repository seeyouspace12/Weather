import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-simple-alert',
  templateUrl: './simple-alert.component.html',
  styleUrls: ['./simple-alert.component.css']
})
export class SimpleAlertComponent {

  constructor(
    public dialogRef: MatDialogRef<SimpleAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
