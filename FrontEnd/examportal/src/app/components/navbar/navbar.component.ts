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
    this.loginServiceObj.loginStatusSubject.asObservable().subscribe((data) => {
      if (data == false) {
        return;
      }
      this.isLoggedIn = this.loginServiceObj.isLoggedIn();
      this.userDetails = this.loginServiceObj.getUserDetails();
    });
  }

  logOutUser() {
    this.loginServiceObj.logout();
    this.isLoggedIn = false;
    this.userDetails = null;
    this.router.navigate(['/login']);
  }
}
