import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    let headers  = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers});
      // .pipe(map((res:any) => res.json()));
  }

  authenticateUser(user) {
    let headers  = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers});
  }

  getProfile() {
    this.loadToken();
    let headers  = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
   // headers.set('Authorization', this.authToken);
   // headers.append('Content-Type', 'application/json');
    
    return this.http.get('http://localhost:3000/users/profile', {headers});
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    //return tokenNotExpired();
    const helper = new JwtHelperService();
    this.loadToken();
    return !helper.isTokenExpired(this.authToken);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
