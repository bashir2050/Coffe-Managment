import { GlobalConstants } from './../../../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from './../../../services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm:any=FormGroup;
  dialogAction:any="Add";
  action:any="Add"

    responsemessage:any;


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,private categoryService: CategoryService,
              private route: Router,
              private matSnakeBar: MatSnackBar,
              private formBuilder:FormBuilder,
              private snackbarService: SnackbarService,
              private ngxService:NgxUiLoaderService,
              private dailogRef:MatDialogRef<CategoryComponent>,


  ) {
  }
  ngOnInit():void {
    this.categoryForm= this.formBuilder.group({
      name: [null, [Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],

  });
  if(this.dialogAction.action==='Edit'){
    this.dialogAction='Edit';
    this.action="Update"
    this.categoryForm.patchValue(this.dialogData.data);
  }
  }
  handleSubmit(){
    if(this.dialogAction==="Edit"){
      this.edit();
  }else{
    this.add();
  }
  }
  add(){
    this.ngxService.start();
    var formData = this.categoryForm.value;
    var data={
      name:formData.name,

    }

    this.categoryForm.add(data).subscribe((res:any)=>{
      this.dailogRef.close();
      this.onAddCategory.emit();
      this.responsemessage=res?.message;
      this.snackbarService.openSnackBar(this.responsemessage,"success");
    },(error:any)=>{
      this.dailogRef.close();
        if(error.error?.message){
          this.responsemessage= error.error?.message;
        }
        else{
          this.responsemessage= GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responsemessage,GlobalConstants.error);

        })
      }

  edit(){

    var formData = this.categoryForm.value;
    var data={
      id:this.dialogData.data.id,
      name:formData.name,

    }

    this.categoryForm.add(data).subscribe((res:any)=>{
      this.dailogRef.close();
      this.onEditCategory.emit();
      this.responsemessage=res?.message;
      this.snackbarService.openSnackBar(this.responsemessage,"success");
    },(error:any)=>{
      this.dailogRef.close();
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
