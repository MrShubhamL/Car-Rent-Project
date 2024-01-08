import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { StorageService } from '../storage/storage.service';



@Injectable({
  providedIn: 'root'
})
class PermissionsService {
  constructor(private router:Router){}
  canActivate(): boolean {
    if(StorageService.isLoggedIn() &&  StorageService.getUserRole()=="CUSTOMER"){
      return true
    }
    this.router.navigate(['/']);
    return false;
  }

}

export const customerGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
