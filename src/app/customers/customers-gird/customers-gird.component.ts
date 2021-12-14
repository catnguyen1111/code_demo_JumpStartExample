import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/interface';
import { DataService } from 'src/app/Services/data.service';

import { CustomerState } from 'src/app/Store/customer.state';
import * as CustomerActions from 'src/app/Store/customer.action';
import { Select, Store } from '@ngxs/store';
@Component({
  selector: 'app-customers-gird',
  templateUrl: './customers-gird.component.html',
  styleUrls: ['./customers-gird.component.scss']
})
export class CustomersGirdComponent implements OnInit {
  @Select(CustomerState.customer) customers$!: Observable<Customer[]>
  public datas$ !:Observable<Customer[]>;
  constructor(public dataService: DataService,private store:Store) { }

  data:any;

  ngOnInit(): void {
  //  this.dataService.getCustomeres().subscribe(customer => {
  //     console.log("customer gird",customer);
  //     this.data = customer;
  //   })
    this.store.dispatch(new CustomerActions.GetCustomers())
  }
  delete(customer:Customer):void {

    console.log("delete",customer.id)
    this.store.dispatch(new CustomerActions.DeleteCustomer(customer.id))

    // this.dataService.deleteCustomer(customer.id).subscribe()
    // this.dataService.getCustomeres().subscribe(customer => {
    //   console.log("customer gird",customer);
    //   this.data = customer;
    // })

  }

}
