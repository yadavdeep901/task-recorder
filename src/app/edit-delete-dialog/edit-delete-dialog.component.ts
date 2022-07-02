import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface timeSheetData {
  startTime: string;
  endTime: string;
  minutes: string;
  description: string;
}


@Component({
    selector: 'app-edit-delete-dialog',
    templateUrl: './edit-delete-dialog.component.html',
    styleUrls: ['./edit-delete-dialog.component.scss']
  })
  export class EditDeleteDialogComponent {

  action:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<EditDeleteDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: timeSheetData) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
