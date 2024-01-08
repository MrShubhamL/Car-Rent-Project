import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.css'
})

export class PostCarComponent implements OnInit {
  postCarForm!: FormGroup;
  isSpining: boolean = false;
  selectedFile!: Blob;
  imagePreview!: string | ArrayBuffer | null;
  listOfOption: Array<{ label:string, value:string}> = [];
  listOfBrand = ["BMW","AUDI","FARRARI","TESLA","MARUTI","TATA","VOLVO", "HONDA", "FORD", "NISSAN"]
  listOfType = ["Petrol", "Diesel", "Hybrid", "Electric", "CNG"];
  listOfColors = ["Black", "Red", "Voilate", "Green", "Orange", "White", "Blue", "Silver"];
  listOfTransmission = ["Manual", "Automcatic"];

  submitted = false;

  get f(): { [key: string]: AbstractControl } {
    return this.postCarForm.controls;
  }
  constructor(private formBuilder: FormBuilder,
    private service: AdminService,
    private toast:ToastrService,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.postCarForm = this.formBuilder.group(
      {
        image: ['', [Validators.required]],
        type: ['', [Validators.required]],
        brand: ['', [Validators.required]],
        name: ['', [Validators.required]],
        modelYear: ['', [Validators.required]],
        price: ['', [Validators.required]],
        transmission: ['', [Validators.required]],
        color: ['', [Validators.required]],
        description: ['', [Validators.required]],
      }
  )}

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  postCar(){
    console.log(this.postCarForm.value);
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('type', this.postCarForm.get('type')?.value)
    formData.append('brand', this.postCarForm.get('brand')?.value)
    formData.append('name', this.postCarForm.get('name')?.value)
    formData.append('modelYear', this.postCarForm.get('modelYear')?.value)
    formData.append('price', this.postCarForm.get('price')?.value)
    formData.append('transmission', this.postCarForm.get('transmission')?.value)
    formData.append('color', this.postCarForm.get('color')?.value)
    formData.append('description', this.postCarForm.get('description')?.value)
    this.service.postCar(formData).subscribe(res => {
      this.toast.success("Car details are saved successfully.", "Successful");
      this.router.navigate(['/admin/dashboard'])
    },
    err => {
      this.toast.error("Car details are not saved.", "Failed");
      console.log(err);
    })
  }

  checkValidation(){
    this.submitted=true;
  }

  resetForm(){
    this.submitted=false;
    this.postCarForm.reset();
  }
}

