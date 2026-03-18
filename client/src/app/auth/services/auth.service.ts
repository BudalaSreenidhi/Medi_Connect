
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationDTO } from '../../mediconnect/models/UserRegistrationDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:9876/context.html/user/login',
      data
    );
  }

  createUser(user: UserRegistrationDTO): Observable<any> {
    return this.http.post(
      'http://localhost:9876/context.html/user/register',
      user
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.clear();
  }
}