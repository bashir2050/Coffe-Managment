import { GlobalConstants } from './../../../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from './../../../services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  oldPassword=true;

  newPassword=true;
  confirmPassword= true;
  changePasswordForm:any=FormGroup;
  responsemessage:any;


constructor(private userService: UserService,
            private route: Router,
            private matSnakeBar: MatSnackBar,
            private formBuilder:FormBuilder,
            private snackbarService: SnackbarService,
            private dailogRef:MatDialogRef<ChangePasswordComponent>,
            private ngxService:NgxUiLoaderService

) {
}
ngOnInit():void {
  this.changePasswordForm= this.formBuilder.group({
    oldPassword: [null, [Validators.required]],
    NewPassword: [null, [Validators.required]],
  confirmPassword: ['', [Validators.required,]],
});

}

validateSubmit(){
  if(this.changePasswordForm.controls['newPassword'].values !=this.changePasswordForm.controls['confirmPassword'].values){
  return true;
}else{
  return false;
}
}

handleSubmit(){
  this.ngxService.start();
  var formData = this.changePasswordForm.value;
  var data={

    oldPassword:formData.oldPassword,
    newPassword:formData.newPassword,
    confirmPassword:formData.confirmPassword,
  }

  this.userService.changePassword(data).subscribe((res:any)=>{
    this.ngxService.stop();
    this.dailogRef.close();
    this.responsemessage=res?.message;
    this.snackbarService.openSnackBar(this.responsemessage,"success");

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
