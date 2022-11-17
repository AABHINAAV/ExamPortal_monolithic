import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  constructor(
    private userService: UserService,
    private snackBarObj: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    // console.log(this.user);
    
    if(this.user.username.trim() == '' || this.user.username == null) {
      this.snackBarObj.open('Username is required !!' , 'OK' , {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    if(this.user.password.trim() == '' || this.user.password == null) {
      this.snackBarObj.open('Password cannot be empty !!' , 'OK' , {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    if(this.user.firstName.trim() == '' || this.user.firstName == null) {
      this.snackBarObj.open('First Name is required !!' , 'OK' , {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    if(this.user.lastName.trim() == '' || this.user.lastName == null) {
      this.snackBarObj.open('Last Name is required !!' , 'OK' , {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    if(this.user.email.trim() == '' || this.user.email == null) {
      this.snackBarObj.open('Email is required !!' , 'OK' , {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    if(this.user.phone.toString().trim() == '' || this.user.phone == null) {
      this.snackBarObj.open('Contact Number is required !!' , 'OK' , {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    this.userService.createUser(this.user).subscribe(
      (res: any) => {
        // console.log(res);
        Swal.fire({
          title: '<h1>Good job!</h1>',
          icon: 'success',
          html: 'You are successfully registered!!',
          showCancelButton: true,
          confirmButtonText: 'Go to LogIn Page',
          cancelButtonText: 'Close',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        });
      },
      (err) => {
        // console.log(err);
        // console.log(err.error);
        // console.log(err.error.message);
        this.snackBarObj.open(err.error.message, '', {
          duration: 3000,
        });
      }
    );
  }
}
