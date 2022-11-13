import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBarObj: MatSnackBar
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert('user is require !!');
      this.snackBarObj.open('Username is required !!', '', { duration: 3000 });
      return;
    }

    this.userService.createUser(this.user).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire(
          'Good job!',
          `User is successfully Registered with id ${res.id}!!`,
          'success'
        );
      },
      (err) => {
        console.log(err);
        this.snackBarObj.open('Something went wrong !!', '', {
          duration: 3000,
        });
      }
    );
  }
}
