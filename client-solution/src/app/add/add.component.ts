import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewComponent } from '../view/view.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  employees: any[] = [];
  managers = ['Jeffrey Wells', 'Victor Atkins', 'Kelli Hamilton'];
  selected = '----';

  constructor(
    public dialogRef: MatDialogRef<ViewComponent>,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  profileForm = this.formBuilder.group({
    employee_id: [''],
    last_name: [''],
    first_name: [''],
    roles: [''],
    manager: [''],
  });

  // updates the selected value in dropdown
  update(e: any) {
    this.selected = e.target.value;
  }

  // save button adds the profileForm onto a database and closes dialog
  async save() {
    await this.http
      .post('http://localhost:3000/employee/add', {
        employee_id: this.profileForm.value.employee_id,
        last_name: this.profileForm.value.last_name,
        first_name: this.profileForm.value.first_name,
        roles: this.profileForm.value.roles,
        manager: this.profileForm.value.manager,
      })
      .toPromise();

    this.dialogRef.close('Employee Added');
  }

  //cancel button closes dialog
  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
