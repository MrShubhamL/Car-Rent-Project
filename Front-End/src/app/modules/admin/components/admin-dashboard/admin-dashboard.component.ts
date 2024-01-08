import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  cars: any = [];
  isSpining:boolean = true;
  constructor(private service: AdminService){}

  ngOnInit(): void {
    this.isSpining=true;
      this.service.getAllCars().subscribe((res: any) =>{
        this.isSpining=false;
        res.forEach((element: { processedImg: string; returnedImage: string; }) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
          this.cars.push(element)
        });
        console.log(this.cars)
      })
  }



}
