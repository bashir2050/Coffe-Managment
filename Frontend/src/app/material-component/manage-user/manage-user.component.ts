import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { CategoryComponent } from './../dialog/category/category.component';
import { GlobalConstants } from './../../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from './../../services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { BillService } from 'src/app/services/bill.service';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {


  displayedColumns:string[]=['name','email','contactNumber','status'];
  dataSource:any;


  responsemessage:any;
  constructor(private userService:UserService,
    private route: Router,
    private categoryService: CategoryService,
    private billService: BillService,
    private matSnakeBar: MatSnackBar,
    private formBuilder:FormBuilder,
    private snackbarService: SnackbarService,
    private dailogRef:MatDialogRef<ManageUserComponent>,
    private diaolog: MatDialog,
    private ngxService:NgxUiLoaderService

) {
}

  ngOnInit(): void {

    this.ngxService.start();
    this.tableData();
  }


  tableData(){


  this.userService.getUsers().subscribe((res:any)=>{
    this.ngxService.stop();
    this.tableData();
    this.dataSource=new MatTableDataSource(res);
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

    applyFilter(event:Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter=filterValue.trim().toLowerCase();
    }

    onChange(status:any,id:any){
      this.ngxService.start();
      var data={
        status:status.toString(),
        id:id
      }
      this.userService.update(data).subscribe((res:any)=>{
        this.ngxService.stop();
        this.tableData();
        this.responsemessage=res?.message;
        this.snackbarService.openSnackBar(this.responsemessage,"success");
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
    HandleviewAction(values:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data={
        data:values
      }
      dialogConfig.width="100%";
      const dialogRef =this.diaolog.open(ViewBillProductsComponent,dialogConfig);
      this.route.events.subscribe(()=>{
        dialogRef.close();

      });
    }


    HandleDeleteAction(values:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data={
        message:'delete'+values.name + 'bill',
        confirmation:true
      }

      const dialogRef =this.diaolog.open(ConfirmationComponent,dialogConfig);
      this.route.events.subscribe(()=>{
        this.ngxService.start();
        this.deleteBill(values.id);
        dialogRef.close();

      });
    }

    deleteBill(id:any){

      this.billService.delete(id).subscribe((res:any)=>{
        this.ngxService.stop();
        this.dailogRef.close();
        this.dataSource= new MatTableDataSource(res);
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

    downloadReportAction(values:any){
      this.ngxService.start();
      var data={
        name:values.name,
        email:values.email,
        uuid:values.uuid,
        contactNumber:values.contactNumber,
        paymentMethod:values.paymentMethod,
        totalAmount:values.totalAmount,
        productDetails:values.productDetails,
      }
      this.downloadFile(values.uuid,data)
    }

    downloadFile(fileName:string,data:any){

      this.billService.getPdf(data).subscribe((res)=>{
        saveAs(res,fileName+'.pdf');
        this.ngxService.stop();
      })

    }
  }
