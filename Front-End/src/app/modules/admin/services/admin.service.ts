import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:8081";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postCar(postCarRequest: any): Observable<any>{
    return this.http.post(BASIC_URL + "/dashboard/admin/car", postCarRequest, {
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders{
    let authHeader:HttpHeaders = new HttpHeaders();
    return authHeader.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }

  getAllCars():any{
    return this.http.get(BASIC_URL + "/dashboard/admin/allCars", {
      headers: this.createAuthorizationHeader()
    })
  }

}
