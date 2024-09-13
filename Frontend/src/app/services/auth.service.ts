import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route:Router) { }

  public isAuthenticated():boolean{
    const token = localStorage.getItem('token');
    if(!token){
      this.route.navigate(['/']);
      return false;
    }else{
      return true;
    }
  }

}
