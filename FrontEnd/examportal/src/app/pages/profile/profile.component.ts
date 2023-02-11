import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private loginServiceObj: LoginService,
    private routerObj: Router
  ) {}

  ngOnInit(): void {
    this.user = this.loginServiceObj.getUserDetails();
  }

  routeToUpdateDetailsPageFun() {
    let userRole = this.loginServiceObj.getUserRole();

    if (userRole == 'ADMIN') {
      console.log('navigating to admin profile update page');
      this.routerObj.navigate([
        '/admin-dashboard/updateProfile/user_id/' + this.user.id,
      ]);
    } else {
      console.log('navigating to normal user profile update page');
      this.routerObj.navigate([
        '/user-dashboard/updateProfile/user_id/' + this.user.id,
      ]);
    }
  }
}
