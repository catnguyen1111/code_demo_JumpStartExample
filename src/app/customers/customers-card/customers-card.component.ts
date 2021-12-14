import { Icu } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/model/interface';
import { DataService } from 'src/app/Services/data.service';
import { CustomerState } from 'src/app/Store/customer.state';
import * as CustomerActions from 'src/app/Store/customer.action';
@Component({
  selector: 'app-customers-card',
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.scss']
})
export class CustomersCardComponent implements OnInit {
  @Select(CustomerState.customer) customers$!: Observable<Customer[]>

  constructor(
    public dataService: DataService,
    public store: Store
    ) { }
  datas!:Observable<Customer[]>;
  data:any;
  ngOnInit(): void {

    this.getCustomer();

  }
  getCustomer(){
    // this.dataService.getCustomeres().subscribe((customers)=>{
    //   console.log("customers",customers),
    //    this.data = customers,
    //   console.log("data1",this.data)
    //   })
    this.store.dispatch(new CustomerActions.GetCustomers())

  }
}
