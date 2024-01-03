import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  isSpinning:boolean = false;
  registerForm! : FormGroup

  constructor(private fb: FormBuilder, private authServe: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.confirmPaswordValidator]]
    })
  }

  confirmPaswordValidator = (control: FormControl) : { [s: string]: boolean } => {
    if(!control.value){
      return {required: true};
    }
    else if(control.value !== this.registerForm.controls['password'].value){
      return { confirm: true, error: true}
    }
    return {}
  }

  register(){
    if(this.registerForm==null){
      console.log("Error");
    }
    else{
      this.authServe.register(this.registerForm.value).subscribe(res=>{
        this.clearForm()
        console.log(res)
      })
    }
  }

  clearForm(){
    this.registerForm.reset()
  }


}


