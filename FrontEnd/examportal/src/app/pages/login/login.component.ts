import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private loginServiceObj: LoginService,
    private router: Router
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
      (res: any) => {
        console.log('SUCCESS');
        console.log(res);

        //login the user by saving token to the local storage
        this.loginServiceObj.loginUser(res.token);

        // getting user details of current logged in user
        this.loginServiceObj.getCurrentUser().subscribe((data: any) => {
          this.loginServiceObj.setUserDetails(data);
          console.log(data);

          // redirect ... ADMIN : admin-dashboard
          // redirect ... NORMAL : normal-dashboard
          if (this.loginServiceObj.getUserRole() == 'ADMIN') {
            this.router.navigate(['/admin-dashboard']);
          } else if (this.loginServiceObj.getUserRole() == 'NORMAL') {
            this.router.navigate(['/user-dashboard']);
          } else {
            this.loginServiceObj.logout();
          }
        });
      },
      (err) => {
        console.log('ERROR');
        console.log(err);
        this.snack.open('Invalid Credentials !!', '', { duration: 3000 });
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
