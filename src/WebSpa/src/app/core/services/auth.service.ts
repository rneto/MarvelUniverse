import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.authApi.baseUrl;
  private isAuthenticated: boolean = false;
  private user: User;

  constructor(private router: Router, private http: HttpClient) {
    if (localStorage.getItem('user') != null) {
      this.user = <User>JSON.parse(localStorage.getItem('user'));
      this.isAuthenticated = true;
    }
  }

  login(email: string, password: string) {

    return this.http.post<any>(`${this.baseUrl}/login`, { email, password })
      .pipe(map(data => {
        localStorage.setItem('user', JSON.stringify(data));
        this.user = <User>data;
        this.isAuthenticated = true;
        return data;
      }));
  }

  register(name: string, surname: string, email: string, password: string) {

    return this.http.post<any>(`${this.baseUrl}/users`, { name, surname, email, password })
      .pipe(map(data => {
        localStorage.setItem('user', JSON.stringify(data));
        this.user = <User>data;
        this.isAuthenticated = true;
        return data;
      }));
  }

  logout(redirect: string): void {
    localStorage.removeItem("user");
    this.isAuthenticated = false;
    this.user = null;
    this.router.navigate([redirect]);
  }

  get authenticated(): boolean {
    return this.isAuthenticated;
  }

  get userName(): string {
    return this?.user?.name || '';
  }

  checkAuthenticated(): boolean {
    return this.isAuthenticated;
  }

}
