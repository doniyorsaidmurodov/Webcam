import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-user-list',
  templateUrl: './add-user-list.component.html',
  styleUrls: ['./add-user-list.component.scss']
})
export class AddUserListComponent implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      nameBorderControl: new FormControl('', Validators.required),
      responsiblePerson: new FormControl('', Validators.required),
      info: new FormControl('', Validators.required)
    });
  }

  submit() {
    if (this.form.valid) {
      console.log('Form: ', ...this.form.value);
      this.form.reset();
    }
  }
}
