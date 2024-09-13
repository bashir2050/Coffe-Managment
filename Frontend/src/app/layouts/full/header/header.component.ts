import { ChangePasswordComponent } from './../../../material-component/dialog/change-password/change-password.component';
import { ConfirmationComponent } from './../../../material-component/dialog/confirmation/confirmation.component';
import { UserService } from './../../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
role : any;
  constructor(private dailog:MatDialog,private UserService: UserService,
    private route: Router,private diaolog: MatDialog){


    }

    logout(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data={
        message:'Logout',
        confirmation:true};
        const dialogRef= this.dailog.open(ConfirmationComponent,dialogConfig);
        const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((res)=>{
          dialogRef.close();
          localStorage.clear();
          this.route.navigate(['/']);
        })
      }

      changePassword(){
        const dialogConfig = new MatDialogConfig();
    dialogConfig.width="550px";
    this.dailog.open(ChangePasswordComponent,dialogConfig);
  }
      }

