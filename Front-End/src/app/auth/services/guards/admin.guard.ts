import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';




@Injectable({
  providedIn: 'root'
})
class PermissionsService {
  constructor(private router:Router){}
  canActivate(): boolean {
    if(StorageService.isLoggedIn() &&  StorageService.getUserRole()=="ADMIN"){
      return true
    }
    this.router.navigate(['/']);
    return false;
  }

}

export const adminGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
