import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersCardComponent } from './customers/customers-card/customers-card.component';
import { CustomersGirdComponent } from './customers/customers-gird/customers-gird.component';
import { CustomersComponent } from './customers/customers.component';
import { DetailCustomerComponent } from './customers/detail-customer/detail-customer.component';
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { ResolveGuard } from './resolve.guard';

const routes: Routes = [
  {path: 'customers', component:CustomersComponent},
  {path: 'customers/card', component:CustomersCardComponent},
  {path: 'customers/gird', component:CustomersGirdComponent},
  {path: 'customers/new', component:NewCustomerComponent},
  {path:'detail/:id',component:DetailCustomerComponent,
    resolve:{
      data:ResolveGuard,
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
