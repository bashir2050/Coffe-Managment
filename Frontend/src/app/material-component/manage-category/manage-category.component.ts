import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { GlobalConstants } from './../../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from './../../services/snackbar.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryComponent } from '../dialog/category/category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
displayedColumns:string[]=['name','edit'];
dataSource:any;
responsemessage:any;


constructor(private categoryService:CategoryService,
          private route: Router,
          private matSnakeBar: MatSnackBar,
          private formBuilder:FormBuilder,
          private snackbarService: SnackbarService,
          private dailogRef:MatDialogRef<CategoryComponent>,
          private diaolog: MatDialog,
          private ngxService:NgxUiLoaderService

) {
}
ngOnInit():void {
  this.ngxService.start();
  this.tableData();
}


tableData(){


this.categoryService.getCategory().subscribe((res:any)=>{
  this.ngxService.stop();
  this.dailogRef.close();
  this.dataSource= new MatTableDataSource(res);
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
  HandleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'Edit',
      data:values
    }
    dialogConfig.width="850px";
    const dialogRef =this.diaolog.open(CategoryComponent,dialogConfig);
  this.route.events.subscribe(()=>{
    dialogRef.close();

  });

  const sub =dialogRef.componentInstance.onAddCategory.subscribe((response)=>{
    this.tableData();
  })

  }


  HandleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'Add'
    }
    dialogConfig.width="850px";
    const dialogRef =this.diaolog.open(CategoryComponent,dialogConfig);
  this.route.events.subscribe(()=>{
    dialogRef.close();

  });

  const sub =dialogRef.componentInstance.onEditCategory.subscribe((response)=>{
    this.tableData();
  })

  }




}
