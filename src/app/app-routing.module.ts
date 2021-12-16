import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from './auth-admin.guard';
import { AuthGuard } from './auth.guard';
import { CustomersCardComponent } from './customers/customers-card/customers-card.component';
import { CustomersGirdComponent } from './customers/customers-gird/customers-gird.component';
import { CustomersComponent } from './customers/customers.component';
import { DetailCustomerComponent } from './customers/detail-customer/detail-customer.component';
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { LoginComponent } from './login/login.component';
import { ResolveGuard } from './resolve.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent,canDeactivate:[AuthGuard]},
  {path: 'customers', component:CustomersComponent,canActivate :[AuthGuard]},
  {path: 'customers/card', component:CustomersCardComponent,canActivate :[AuthGuard]},
  {path: 'customers/gird', component:CustomersGirdComponent,canActivate :[AuthGuard]},
  {path: 'customers/new', component:NewCustomerComponent,canActivate :[AuthGuard]},
  {path:'detail/:id',component:DetailCustomerComponent,canActivate :[AuthAdminGuard],
    resolve:{
      data:ResolveGuard,
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
