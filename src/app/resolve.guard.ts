import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Resolve, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DataService } from './Services/data.service';
import * as CustomerActions from 'src/app/Store/customer.action';
import { delay } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<any>{
  constructor(
    private dataService: DataService,
    private store:Store,
    private spinner: NgxSpinnerService
    ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = Number(route.paramMap.get('id'));
    // this.spinner.show()
    return this.store.dispatch(new CustomerActions.GetCustomer(id))
  }

}
