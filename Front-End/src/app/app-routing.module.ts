import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { adminGuard } from './auth/services/guards/admin.guard';
import { customerGuard } from './auth/services/guards/customer.guard';



const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "registration", component: RegisterComponent},
  {path: "admin", canActivate: [adminGuard], loadChildren: () => import("./modules/admin/admin.module").then(m=>m.AdminModule)},
  {path: "customer", canActivate: [customerGuard], loadChildren: () => import("./modules/customer/customer.module").then(m=>m.CustomerModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
