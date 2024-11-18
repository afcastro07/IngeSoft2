import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8000/users/';

  constructor(private http: HttpClient) { }

  registerUser(userData: any) {
    return this.http.post(`${this.baseUrl}register/`, userData);
  }

  loginUser(credentials: any) {
    return this.http.post(`${this.baseUrl}login/`, credentials);
  }

  getDashboard(): Observable<any> {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('No user found');
    }
    
    const user = JSON.parse(userStr);
    if (!user || !user.id) {
      throw new Error('Invalid user data');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'user-id': user.id.toString()
    });

    return this.http.get(`${this.baseUrl}dashboard/`, { headers });
  }
}
