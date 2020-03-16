import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ApiService} from '../services/api.service';

export interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  rememberMe = false;
  form: FormGroup;
  loading = false;
  errorMessage: boolean = null;
  serverError: boolean = null;

  constructor(private router: Router, private authService: AuthService, private api: ApiService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.errorMessage = false;
    this.serverError = false;
  }


  submit() {
    // this.router.navigate(['/home']).then(); // for testing

    this.checkValidation();
    if (!this.form.valid) {
      console.log('Form: ', ...this.form.value);
      // this.form.reset();
      return;
    }

    const user: User = {
      username: this.form.value.username,
      password: this.form.value.password
    };
    this.loading = true;

    this.api.login(user).subscribe(next => {
      this.loading = false;
      if (next.success) {
        this.errorMessage = false;
        this.form.reset();
        this.authService.setToken(next.token, this.rememberMe);
        console.log('next', next);
        this.router.navigate(['/home']).then();
      }
    }, error => {
      this.loading = false;
      if (error.status === 500) {
        this.serverError = true;
        this.errorMessage = false;
      }
      if (error.status === 400 || error.status === 0) {
        this.loading = false;
        this.serverError = false;
        this.errorMessage = true;
      }
      console.log('error', error.error.message);
      // this.errorMessage = true;
      this.authService.logOut();
    }, () => {
      this.loading = false;
    });

  }

  checkValidation() {
    const controls = this.form.controls;
    Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
  }
}
