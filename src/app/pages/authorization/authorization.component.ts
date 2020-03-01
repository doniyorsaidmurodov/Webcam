import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }


  submit() {
    this.checkValidation();
    if (this.form.valid) {
      console.log('Form: ', ...this.form.value);
      // this.form.reset();
    }
  }

  checkValidation() {
    const controls = this.form.controls;
    Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
