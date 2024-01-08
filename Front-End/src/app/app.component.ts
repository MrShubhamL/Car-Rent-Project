import { Component, OnInit } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {ngSkipHydration: 'true'}
})


export class AppComponent implements OnInit{

  isAdminLoggedIn:boolean = StorageService.isAdminLoggedIn();
  isCustomerLoggedIn:boolean = StorageService.isCustomerLoggedIn();
  title = 'app';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event =>{
      if(event.constructor.name == "NavigationEnd"){
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    })
  }

  logout(){
    StorageService.logout();
    this.router.navigate(['/login'])
  }
}
