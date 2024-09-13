import { GlobalConstants } from './../../../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from './../../../services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Inject } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm:any=FormGroup;
  dialogAction:any="Add";
  action:any="Add";

    responsemessage:any;

    categorys:any=[];


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,private categoryService: CategoryService,
              private route: Router,
              private productService :ProductService,
              private matSnakeBar: MatSnackBar,
              private formBuilder:FormBuilder,
              private snackbarService: SnackbarService,
              private ngxService:NgxUiLoaderService,
              private dailogRef:MatDialogRef<ProductComponent>,


  ) {
  }
  ngOnInit():void {
    this.productForm= this.formBuilder.group({
      name: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],


  });
  if(this.dialogAction.action==='Edit'){
    this.dialogAction='Edit';
    this.action="Update"
    this.productForm.patchValue(this.dialogData.data);
  }
  }

  getCategory(){
    this.categoryService.getCategory().subscribe((res)=>{
this.categorys=res;
    },(error:any)=>{
        if(error.error?.message){
          this.responsemessage= error.error?.message;
        }
        else{
          this.responsemessage= GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responsemessage,GlobalConstants.error);

        })
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
    var formData = this.productForm.value;
    var data={
      name:formData.name,
      categoryId:formData.categoryId,
      price:formData.price,
      description:formData.description

    }

    this.productForm.add(data).subscribe((res:any)=>{
      this.dailogRef.close();
      this.onAddProduct.emit();
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

    var formData = this.productForm.value;
    var data={
      id:this.dialogData.data.id,
      name:formData.name,
      categoryId:formData.categoryId,
      price:formData.price,
      description:formData.description

    }

    this.productForm.Update(data).subscribe((res:any)=>{
      this.dailogRef.close();
      this.onEditProduct.emit();
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
