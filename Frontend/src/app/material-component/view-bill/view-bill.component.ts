import { saveAs } from 'file-saver';
import { ManageOrderComponent } from './../manage-order/manage-order.component';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {

  displayedColumns:string[]=['name','category','price','quantity','total','edit'];
  dataSource:any;


  responsemessage:any;
  constructor(private productService:ProductService,
    private route: Router,
    private categoryService: CategoryService,
    private matSnakeBar: MatSnackBar,private billService:BillService,
    private formBuilder:FormBuilder,
    private snackbarService: SnackbarService,
    private dailogRef:MatDialogRef<ManageOrderComponent>,
    private diaolog: MatDialog,
    private ngxService:NgxUiLoaderService

) {
}

  ngOnInit(): void {

    this.ngxService.start();
    this.tableData();
  }


  tableData(){


  this.billService.getBills().subscribe((res:any)=>{
    this.ngxService.stop();
    this.tableData();
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

    applyFilter(event:Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter=filterValue.trim().toLowerCase();
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
