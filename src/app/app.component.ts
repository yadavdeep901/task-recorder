//app.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditDeleteDialogComponent } from './edit-delete-dialog/edit-delete-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface timeSheetData {
  startTime: string;
  endTime: string;
  minutes: string;
  description: string;
}

const TIMESHEET_DATA: timeSheetData[] = [
  {
    startTime: '11:00',
    endTime: '2:00',
    minutes: '360',
    description: 'Initial data'
  },
  {
    startTime: '12:00',
    endTime: '3:00',
    minutes: '300',
    description: 'second data'
  },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['Start Time', 'End Time', 'Minutes', 'Description', 'operation'];
  dataSource: any;
  AddTimeDataForm: FormGroup = this.fb.group({
    startTime: [''],
    endTime: [''],
    description: [''], 
  });

  @ViewChild(MatTable, { static: true }) table: MatTable<any> | undefined;

  constructor(public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource<any>(TIMESHEET_DATA);
    this.dataSource = TIMESHEET_DATA;
    setInterval(()=>{
      this.dataSource;
    },1000);
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(EditDeleteDialogComponent, {
      width: '550px',
      height: '600px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any) {
    console.log('form data::', row_obj);
    this.dataSource.push({
      startTime: new Date(row_obj.startTime).getHours(),
      endTime: new Date(row_obj.endTime).getHours(),
      minutes: (new Date(row_obj.endTime).getHours() - new Date(row_obj.startTime).getHours())*60,
      description: row_obj.description
    });
    this.table?.renderRows();

  }
  updateRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value: any, key: any) => {
      if (value.id == row_obj.id) {
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value: any, key: any) => {
      return value.id != row_obj.id;
    });
  }

  loadData(): void {
    this.dataSource = []
    this.dataSource = TIMESHEET_DATA;
    this.table?.renderRows();
  }
}
