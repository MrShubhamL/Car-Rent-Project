import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false)
  });
  submitted = false;

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  constructor( private formBuilder: FormBuilder,
     private service: AuthService,
     private toastr: ToastrService
     ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );


  }


  formValidate(){
    this.submitted=true
  }

  onSubmit(){
    this.service.register(this.form.value).subscribe(res=>{
      if(res!=null){
        this.resetForm()
        this.toastr.success('You are successfully regiseter to RentCar.','Regostration Done.');
      }
      else{
        this.toastr.error('Please try again.','Registration Failed.');
      }
    }, er =>{
      this.toastr.info("Email is already exist! Please try other email.",'Registration Failed');
    })
  }

  resetForm(){
    this.form.reset()
  }

}
