import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  validUser: boolean = false;
  loginForm;
  hideLogin: boolean = true;

  constructor(private fb: FormBuilder,
    private _service: LoginService,
    private router: Router) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void { }

  userDetails() {
    event.preventDefault();
    this._service.validateUserProfile().subscribe((userInfo) => {
      userInfo.forEach(user => {
        if (this.loginForm.value.username === user.username &&
          this.loginForm.value.password === user.password) {
          this.validUser = true;
          this.hideLogin = false;
        }
      });
    });
  }
}