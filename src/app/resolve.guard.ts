import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Resolve, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DataService } from './Services/data.service';
import * as CustomerActions from 'src/app/Store/customer.action';

@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<any>{
  constructor(
    private dataService: DataService,
    private store:Store
    ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = Number(route.paramMap.get('id'));

    return this.store.dispatch(new CustomerActions.GetCustomer(id));
  }

}
