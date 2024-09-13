//import { jwt_decode } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
//import * as jwt_decode from "jwt-decode";
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


import { GlobalConstants } from '../shared/global-constants';
import { ActivatedRouteSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(private auth:AuthService,private route:Router,private snackbarService: SnackbarService) { }

  canActivate(route:ActivatedRouteSnapshot):boolean{
    let exptedRoleArray = route.data;
    exptedRoleArray = exptedRoleArray.expectedRole;

    const token:any=localStorage.getItem('token');

    var tokenPayLoad:any;
    try {
      tokenPayLoad = jwtDecode(token);

    }catch(error){
      this.route.navigate(['/']);
      localStorage.clear;
    }

    let expectedRole = '';

    for(let i=0;i<expectedRole.length;i++){
      if(exptedRoleArray[i]== tokenPayLoad.role){
        expectedRole=tokenPayLoad.role;
      }
    }

      if(tokenPayLoad.role=='user' || tokenPayLoad.role == 'admin'){

        if(this.auth.isAuthenticated() && tokenPayLoad.role==expectedRole){
          return true;
        }
        this.snackbarService.openSnackBar(GlobalConstants.unAuthorized,GlobalConstants.error);
        this.route.navigate(['/cafe/dashboard']);
        return false;
      } else{
      this.route.navigate(['/']);
      localStorage.clear;
      return false;
      }
    }


  }


