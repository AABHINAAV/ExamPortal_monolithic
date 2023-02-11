import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //
  //
  // get all users
  public getAllUsers() {
    let url = `${baseUrl}/user/getAllUsers`;
    return this.http.get(url);
  }

  //
  //
  // get user by username
  public getUserByUsername(username: String) {
    let url = `${baseUrl}/user/getUser/${username}`;
    return this.http.get(url);
  }

  //
  //
  // create user
  public createUser(user: any) {
    let url = `${baseUrl}/user/createUser`;
    return this.http.post(url, user);
  }

  //
  //
  // update user details
  public updateUserDetails(userId: any, userDetail: any) {
    let url = `${baseUrl}/user/updateUser/${userId}`;
    return this.http.put(url, userDetail);
  }
}
