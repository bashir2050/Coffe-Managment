import { GlobalConstants } from './../../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from './../../services/snackbar.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductComponent } from '../dialog/product/product.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { stat } from 'fs';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  displayedColumns:string[]=['name','categoryName','description','price','edit'];
dataSource:any;
responsemessage:any;


constructor(private productService:ProductService,
          private route: Router,
          private matSnakeBar: MatSnackBar,
          private formBuilder:FormBuilder,
          private snackbarService: SnackbarService,
          private dailogRef:MatDialogRef<ManageProductComponent>,
          private diaolog: MatDialog,
          private ngxService:NgxUiLoaderService

) {
}
ngOnInit():void {
  this.ngxService.start();
  this.tableData();
}


tableData(){


this.productService.getProducts().subscribe((res:any)=>{
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

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }
  HandleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'Edit',
      data:values
    }
    dialogConfig.width="850px";
    const dialogRef =this.diaolog.open(ProductComponent,dialogConfig);
  this.route.events.subscribe(()=>{
    dialogRef.close();

  });

  const sub =dialogRef.componentInstance.onAddProduct.subscribe((response)=>{
    this.tableData();
  })

  }


  HandleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'Add'
    }
    dialogConfig.width="850px";
    const dialogRef =this.diaolog.open(ProductComponent,dialogConfig);
  this.route.events.subscribe(()=>{
    dialogRef.close();

  });

  const sub =dialogRef.componentInstance.onAddProduct.subscribe((response)=>{
    this.tableData();
  })

  }

  HandleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      message:'delete'+values.name+'product',
      confirmation:true
    }

    const dialogRef =this.diaolog.open(ConfirmationComponent,dialogConfig);
    const sub =dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{

    this.ngxService.start();
    this.deleteProduct(values.id);
    dialogRef.close();

  });

}
deleteProduct(id:any){
  this.productService.delete(id).subscribe((res:any)=>{
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

onChange(status:any,id:any){
  this.ngxService.start();
  var data ={
    status:status.toString(),
    id:id
  }
  this.productService.updateStatus(data).subscribe((res:any)=>{
    this.ngxService.stop();

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





  }

