import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-black-list',
  templateUrl: './add-black-list.component.html',
  styleUrls: ['./add-black-list.component.scss']
})
export class AddBlackListComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      patronymic: new FormControl('', Validators.required),
      placeOfBirth: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      passportId: new FormControl('', Validators.required),
      dateOfIssue: new FormControl('', Validators.required),
      expDate: new FormControl('', Validators.required),
      personalization: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      stateCode: new FormControl('', Validators.required),
      wanted: new FormControl('', Validators.required),
      cause: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required)
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  submit() {
    if (this.form.valid) {
      console.log('Form: ', ...this.form.value);
      this.form.reset();
    }
  }

}
