import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8000/users/';

  constructor(private http: HttpClient) { }

  registerUser(userData: any) {
    return this.http.post(`${this.baseUrl}register/`, userData);
  }
}
