import { CategoryComponent } from './../dialog/category/category.component';
import { GlobalConstants } from './../../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from './../../services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { BillService } from 'src/app/services/bill.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {


  displayedColumns:string[]=['name','category','price','quantity','total','edit'];
  dataSource:any;
  manageOrderForm:any=FormGroup;
  categorys:any=[];
  products:any=[];
  price:any;
  totalAmount:number=0;
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
ngOnInit():void {
this.ngxService.start();
this.getCategory();
this.manageOrderForm= this.formBuilder.group({
  name: [null, [Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
  email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
  contactNumber: ['', [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
  password: ['', [Validators.required]],
  paymentMethod: ['', [Validators.required]],
  product: ['', [Validators.required]],
  category: ['', [Validators.required]],
  quantity: ['', [Validators.required]],
  price: ['', [Validators.required]],
  total: ['', [Validators.required]],

 });
}

getCategory(){
  this.categoryService.getFilterCategory().subscribe((res:any)=>{


  this.ngxService.stop();
    this.responsemessage=res?.message;
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
getProductByCategory(value:any){
  this.productService.getProductByCategory(value.id).subscribe((res:any)=>{
    this.products = res;
    this.manageOrderForm.controls['price'].setValue('');
    this.manageOrderForm.controls['quantity'].setValue('');
    this.manageOrderForm.controls['total'].setValue('');
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

getProductByDetails(value:any){

  this.productService.getById(value.id).subscribe((res:any)=>{
    this.products = res;
    this.manageOrderForm.controls['price'].setValue(res.price);
    this.manageOrderForm.controls['quantity'].setValue('1');
    this.manageOrderForm.controls['total'].setValue(this.price*1);
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

setQuantity(value: any){

  var temp= this.manageOrderForm.controls['quantity'].value;

  if(temp>0){
   this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value *this.manageOrderForm.controls['price'].value);


  }
  else if(temp!= ''){
    this.manageOrderForm.controls['quantity'].setValue('1');
    this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value *this.manageOrderForm.controls['price'].value);

  }

}

validateProductAdd(){
  if(this.manageOrderForm.controls['total'].value===0||this.manageOrderForm.controls['total'].value===null||
  this.manageOrderForm.controls['quantity'].value<=0){
    return true;
  }else
  return false;
}

validateSubmit(){
  if(this.totalAmount===0||this.manageOrderForm.controls['name'].value===null||this.manageOrderForm.controls['email'].value===null||this.manageOrderForm.controls['contactNumber'].value===null||this.manageOrderForm.controls['paymentMethod'].value===null){
    return true;
  }else
  return false;
}

add(){
  var formData= this.manageOrderForm.value;
  var productName= this.dataSource.find((e:{id:number})=>e.id===formData.product.id);
  if(productName=== undefined){

    this.totalAmount=this.totalAmount+formData.total;
    this.dataSource.push({id:formData.product.id,name:formData.product.name,category:formData.category.name,quantity:formData.quantity,price:formData.price,total:formData.total});
    this.dataSource=[...this.dataSource];
    this.snackbarService.openSnackBar(GlobalConstants.productAdded,"success");

  }else{
    this.snackbarService.openSnackBar(GlobalConstants.productExistError,GlobalConstants.error);
  }}
  handleDeleteAction(value:any,element:any){
    this.totalAmount= this.totalAmount-element.total;
    this.dataSource.splice(value,1);
    this.dataSource=[...this.dataSource];
    }
  submitAction(){

    var formData=this.manageOrderForm.value;
    var data={
      name:formData.name,
      email:formData.email,
      contactNumber:formData.contactNumber,
      paymentMethod:formData.paymentMethod,
      totalAmount:formData.totalAmount,
      productDetails:JSON.stringify(this.dataSource)
    }

    this.ngxService.start();
    this.billService.generateReport(data).subscribe((res:any)=>{
      this.downloadFile(res?.uuid);
      this.manageOrderForm.reset();
      this.dataSource=[];
      this.totalAmount=0;
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

  downloadFile(fileName:string){
    var data = {
      uuid:fileName
    }
     this.billService.getPdf(data).subscribe((res:any)=>{
      saveAs(res,fileName+'.pdf');
      this.ngxService.stop();

     })
  }
  }

