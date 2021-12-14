import {Injectable} from '@angular/core';
import {Action,Selector,State,StateContext} from '@ngxs/store';


import {tap} from 'rxjs/operators';
import * as CustomerActions from '../Store/customer.action';
import {Observable} from 'rxjs';
import { DataService } from '../Services/data.service';
import { Customer } from '../model/interface';

export interface CustomerStateModel{
  selectedCustomer:Customer;
  customer:Customer[];
}

@Injectable({
  providedIn: 'root'
})
export class CustomerState {
  constructor(private dataService: DataService){}
  @Selector()
  static customer(state: CustomerStateModel){
    return state.customer;
  }

  @Selector()
  static selectedCustomer(state: CustomerStateModel){
    return state.selectedCustomer;
  }

  @Action(CustomerActions.GetCustomers)
  getCustomers(ctx: StateContext<CustomerStateModel>) {
    return this.dataService.getCustomeres().pipe(
      tap((resData: Customer[]) => {
        ctx.patchState({ customer: resData });
      })
    );
  }
  @Action(CustomerActions.GetCustomer)
  getCustomer(ctx: StateContext<CustomerStateModel>, action: CustomerActions.GetCustomer) {
    return this.dataService.getCustomer(action.payload).pipe(
      tap((resData: Customer) => {
        ctx.patchState({ selectedCustomer: resData });
      })
    );
  }
  @Action(CustomerActions.DeleteCustomer)
  deleteCustomer(ctx: StateContext<CustomerStateModel>, action: CustomerActions.DeleteCustomer) {
    return this.dataService.deleteCustomer(action.payload).pipe(
      tap(() => {
        const state = ctx.getState();
        const updatedCustomer = state.customer.filter(customer => customer.id !== action.payload);
        ctx.patchState({ customer: updatedCustomer });
      })
    );
  }
  @Action(CustomerActions.AddCustomer)
  addCustomer(ctx: StateContext<CustomerStateModel>, action: CustomerActions.AddCustomer) {
    return this.dataService.addCustomer(action.payload).pipe(
      tap((resData: Customer) => {
        const state = ctx.getState();
        ctx.patchState({ customer: [...state.customer, resData] });
      })
    );
  }
  @Action(CustomerActions.UpdateCustomer)
  updateCustomer(ctx: StateContext<CustomerStateModel>, action: CustomerActions.UpdateCustomer) {
    const customerForUpdate = action.payload;
    return this.dataService.updateCustomer(customerForUpdate).pipe(
      tap((resData: Customer) => {
        const state = ctx.getState();
        const updatedCustomers = state.customer.map(customers => {
          if (customers.id === customerForUpdate.id) {
            return customerForUpdate;
          } else { return customers; }
        });
        ctx.patchState({ customer: updatedCustomers });
      })
    );
  }

}
