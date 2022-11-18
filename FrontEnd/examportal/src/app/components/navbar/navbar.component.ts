import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userDetails: any = null;

  constructor(private loginServiceObj: LoginService, private router: Router) {}

  ngOnInit(): void {
    // it will be called only when there is any change in value 
    // it happens only during login and log out
    this.loginServiceObj.loginStatusSubject.asObservable().subscribe((data) => {
      if (data == false) {
        this.isLoggedIn = false;
        this.userDetails = null;
        return;
      }
      this.isLoggedIn = this.loginServiceObj.isLoggedIn();
      this.userDetails = this.loginServiceObj.getUserDetails();
    });

    //
    //
    // it will be called everytime so that if page get some changes it also gets updated
    this.isLoggedIn = this.loginServiceObj.isLoggedIn();
    this.userDetails = this.loginServiceObj.getUserDetails();
    
  }

  logOutUser() {
    this.loginServiceObj.logout();
    this.router.navigate(['/login']);
  }
}
