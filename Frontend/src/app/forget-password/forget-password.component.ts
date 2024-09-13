import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../services/snackbar.service';
import { SignupComponent } from '../signup/signup.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {




  forgotPasswordForm:any=FormGroup;
  responsemessage:any;


constructor(private userService: UserService,
            private route: Router,
            private matSnakeBar: MatSnackBar,
            private formBuilder:FormBuilder,
            private snackbarService: SnackbarService,
            private dailogRef:MatDialogRef<ForgetPasswordComponent>,
            private ngxService:NgxUiLoaderService

) {
}
ngOnInit():void {
  this.forgotPasswordForm= this.formBuilder.group({

    email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
});

}



handleSubmit(){
  this.ngxService.start();
  var formData = this.forgotPasswordForm.value;
  var data={

    email:formData.email,
  }

  this.userService.forgotPassword(data).subscribe((res:any)=>{
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
