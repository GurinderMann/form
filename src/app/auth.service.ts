import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private token: string = '';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    console.log('Email:', email, 'Password:', password);

    return this.http.post<any>('http://localhost:3000/login', { email, password }).pipe(
      tap(response => {
        if (response.token) {
          this.token = response.token;
          this.loggedIn = true;
        }
      })
    );
  }
  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/register', { username, password, email }).pipe(
      tap(response => {
        if (response.token) {
          this.token = response.token;
          this.loggedIn = true;
        }
      })
    );
  }

  logout(): void {
    this.token = '';
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getToken(): string {
    return this.token;
  }
}
