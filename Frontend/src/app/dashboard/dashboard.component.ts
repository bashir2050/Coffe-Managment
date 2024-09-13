import { GlobalConstants } from './../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from './../services/snackbar.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DashboardService } from './../services/dashboard.service';
import { DashboardRoutes } from './dashboard.routing';
import { Component, AfterViewInit } from '@angular/core';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  responsemessage:any;
  data:any;
	ngAfterViewInit() { }





constructor(private dashboardService:DashboardService,
            private route: Router,
            private matSnakeBar: MatSnackBar,

            private snackbarService: SnackbarService,

            private ngxService:NgxUiLoaderService)

 {
  this.ngxService.stop();
  this.dashboardData();
}



dashboardData(){

  this.dashboardService.getDetails().subscribe((res:any)=>{
    this.ngxService.stop();
    this.data=res;

  },(error:any)=>{
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
