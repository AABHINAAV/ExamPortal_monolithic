import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private loginServiceObj: LoginService
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.loginData);
    // checking for username
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required', '', {
        duration: 3000,
      });
      return;
    }

    // checking for password
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required', '', {
        duration: 3000,
      });
      return;
    }

    // request to server to generate for token
    this.loginServiceObj.generateToken(this.loginData).subscribe(
      (res) => {
        console.log('SUCCESS');
        console.log(res);
      },
      (err) => {
        console.log('ERROR');
        console.log(err);
      }
    );
  }

  resetFieldsFunction() {
    this.loginData = {
      username: '',
      password: '',
    };
  }
}
