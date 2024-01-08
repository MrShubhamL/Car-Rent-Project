import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  submitted = false;
  public user ={
    userID: '',
    userRole: '',
  }
  public token ={
    token: ''
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  constructor( private formBuilder: FormBuilder,
     private service: AuthService,
     private router: Router
    ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ]
      },
    );
  }

  formValidate(){
    this.submitted=true
  }



  onSubmit(){
    this.service.login(this.form.value).subscribe(res =>{
      if(res!=null){
        this.user.userID = res.userId
        this.user.userRole = res.userRole
        this.token.token = res.jwt
        StorageService.saveUser(this.user)
        StorageService.saveToken(this.token)
        if(StorageService.getToken()!=null && StorageService.getUserRole()=="CUSTOMER"){
          this.router.navigate(['customer/dashboard'])
          AuthService.loginStatusSubject.next(true);
        }
        else if(StorageService.getToken()!=null && StorageService.getUserRole()=="ADMIN"){
          this.router.navigate(['admin/dashboard'])
          AuthService.loginStatusSubject.next(true)
        }
        else{
          this.router.navigate(['/'])
        }

      }
      else{
        console.log("Failed")
      }
    }, err =>{
      console.log(err)
    })
  }

}
