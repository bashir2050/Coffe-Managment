import { ManageOrderComponent } from './manage-order/manage-order.component';
import { RouteGuardService } from './../services/route-guard.service';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ManageUserComponent } from './manage-user/manage-user.component';


export const MaterialRoutes: Routes = [

  {
    path:'category',
    component:ManageCategoryComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole:['admin']
    }
  },
  {
    path:'product',
    component:ManageCategoryComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole:['admin']
    }
  },
  {
    path:'bill',
    component:ViewBillComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole:['admin']
    }
  },
  {
    path:'order',
    component:ManageOrderComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole:['admin','user']
    }
  },
  {
    path:'bill',
    component:ViewBillComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole:['admin','user']
    }
  },
  {
    path:'user',
    component:ManageUserComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole:['admin','user']
    }
  }
];
