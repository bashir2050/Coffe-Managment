import { SnackbarService } from './../services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from '../shared/global-constants';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


    password=true;
    confirmPassword= true;
    signupForm:any=FormGroup;
    responsemessage:any;


  constructor(private userService: UserService,
              private route: Router,
              private matSnakeBar: MatSnackBar,
              private formBuilder:FormBuilder,
              private snackbarService: SnackbarService,
              private dailogRef:MatDialogRef<SignupComponent>,
              private ngxService:NgxUiLoaderService

  ) {
  }
  ngOnInit():void {
    this.signupForm= this.formBuilder.group({
      name: [null, [Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: ['', [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required,]],
  });

  }

  validateSubmit(){
    if(this.signupForm.controls['password'].values !=this.signupForm.controls['confirmPassword'].values){
    return true;
  }else{
    return false;
  }
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data={
      name:formData.name,
      email:formData.email,
      contactNumber:formData.contactNumber,
      password:formData.password,
    }

    this.userService.signup(data).subscribe((res:any)=>{
      this.ngxService.stop();
      this.dailogRef.close();
      this.responsemessage=res?.message;
      this.snackbarService.openSnackBar(this.responsemessage,"");
      this.route.navigate(['/']);
    },(error)=>{
        this.ngxService.stop();
        if(error.error?.message){
          this.responsemessage= error.error?.message;
        }
        else{
          this.responsemessage= GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responsemessage,GlobalConstants.error);

        })
      }


        }





