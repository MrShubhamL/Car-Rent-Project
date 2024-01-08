import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const BASIC_URL: string = "http://localhost:8081";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static loginStatusSubject = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  public register(registerRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/auth/signup", registerRequest);
  }

  public login(loginRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/auth/login", loginRequest)
  }


}
