import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public loginServiceObj: LoginService) {}

  ngOnInit(): void {}

  logOutUser() {
    this.loginServiceObj.logout();
    window.location.reload();
  }
}
