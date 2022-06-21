import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { HttpClient } from '@angular/common/http';

export interface EmployeeElement {
  employee_id: number;
  last_name: string;
  first_name: string;
  roles: string;
  manager: string;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  displayedColumns: string[] = ['employee_id', 'last_name', 'first_name'];

  @ViewChild(MatTable) table: MatTable<EmployeeElement>;

  employees: any[] = [];
  managers = ['Jeffrey Wells', 'Victor Atkins', 'Kelli Hamilton'];
  selected = '----';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  // used to add a new employee to the company
  addEmployee() {
    // angular mat dialog
    const dialogRef = this.dialog.open(AddComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // used to get a list of employees under a manager
  async fetchEmployees() {
    const result = await this.http
      .post<any>('http://localhost:3000/employee/view', {
        manager: this.selected,
      })
      .toPromise();
    // result is copied onto employees array
    this.employees = result;
  }

  // updates the selected value in dropdown
  update(e: any) {
    this.selected = e.target.value;
    this.fetchEmployees();
  }

  ngOnInit(): void {}
}
