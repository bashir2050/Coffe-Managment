import { GlobalConstants } from './../shared/global-constants';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:any=FormGroup;
  responsemessage:any;
  hide = true;


constructor(private userService: UserService,
            private route: Router,
            private matSnakeBar: MatSnackBar,
            private formBuilder:FormBuilder,
            private snackbarService: SnackbarService,
            private dailogRef:MatDialogRef<LoginComponent>,
            private ngxService:NgxUiLoaderService

) {
}
ngOnInit():void {
  this.loginForm= this.formBuilder.group({

    email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
    password: [null, [Validators.required,]]}
);

}



handleSubmit(){
  this.ngxService.start();
  var formData = this.loginForm.value;
  var data={

    email:formData.email,
    password:formData.password,
  }

  this.userService.login(data).subscribe((res:any)=>{
    this.ngxService.stop();
    this.dailogRef.close();
    localStorage.setItem('token',res.token);
    this.route.navigate(['/cafe/dashboard']);
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
