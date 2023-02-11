import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  userId: any;

  userDetails = {
    firstName: '',
    lastName: '',
    phone: '',
    profile: '',
  };

  constructor(
    private activatedRouteObj: ActivatedRoute,
    private loginServiceObj: LoginService,
    private userServiceObj: UserService,
    private routerObj: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRouteObj.snapshot.params['userId'];
    let data = this.loginServiceObj.getUserDetails();
    this.userDetails.firstName = data.firstName;
    this.userDetails.lastName = data.lastName;
    this.userDetails.phone = data.phone;
    this.userDetails.profile = data.profile;
    console.log(this.userDetails);
  }

  updateDetailsFun() {
    console.log(this.userDetails);

    Swal.fire({
      icon: 'info',
      title: 'Do you really want to update these details?',
      confirmButtonText: 'Update',
      confirmButtonColor: 'Blue',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userServiceObj
          .updateUserDetails(this.userId, this.userDetails)
          .subscribe(
            (res: any) => {
              Swal.fire({
                title: '<h1>Good job!</h1>',
                icon: 'success',
                html: 'Details update successfully!! \nLogin again to start with new details😊',
              }).then((result) => {
                this.loginServiceObj.logout();
                this.routerObj.navigate(['/login'])
              });
            },
            (err) => {
              Swal.fire('Error !', 'User details updation error !!', 'error');
            }
          );
      }
    });
  }
}
