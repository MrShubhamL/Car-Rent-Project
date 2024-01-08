import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

const TOKEN: string = "token";
const USER: string = "user";
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveUser(user: any): void {
    if(typeof window !== 'undefined'){
      return window.localStorage.setItem(USER, JSON.stringify(user))
    }
  }

  static saveToken(token: any): void {
    if(typeof window !== 'undefined'){
      return window.localStorage.setItem(TOKEN, JSON.stringify(token))
    }
  }

  // Log out user : remove token from local storage
  static logout() {
    if(typeof window !== 'undefined'){
    AuthService.loginStatusSubject.next(false);
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
    return true;
    }
    return false;
  }

  static getUser() {
    if(typeof window !== 'undefined'){
    let userStr = window.localStorage.getItem(USER);
      if (userStr != null) {
        return JSON.parse(userStr);
      } else {
        this.logout()
        return null;
      }
    }
  }

  static getToken() {
    if(typeof window !== 'undefined'){
      let tokenStr = window.localStorage.getItem(TOKEN);
      if (tokenStr != null) {
        let myToken = JSON.parse(tokenStr);
        return myToken.token;
      } else {
        this.logout()
        return null;
      }
    }
  }

  // Getting user Role
  static getUserRole() {
    if(typeof window !== 'undefined'){
    let user = this.getUser();
    return user.userRole;
    }
  }

  static isLoggedIn() {
    if(typeof window !== 'undefined'){
      let tokenStr = window.localStorage.getItem(TOKEN);
      if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
        return false;
      }
      else {
        return true;
      }
    }
    return false;
  }

  static isAdminLoggedIn():boolean{
    if(typeof window !== 'undefined'){
      let tokeStr = this.getToken();
      if(tokeStr != null){
        let role = this.getUserRole();
        if(role=="ADMIN"){
          return true;
        }
        return false;
      }
      return false;
    }
    return false;
  }

  static isCustomerLoggedIn():boolean{
    if(typeof window !== 'undefined'){
      let tokeStr = this.getToken();
      if(tokeStr != null){
        let role = this.getUserRole();
        if(role=="CUSTOMER"){
          return true;
        }
        return false;
      }
      return false;
    }
    return false;
  }


}
