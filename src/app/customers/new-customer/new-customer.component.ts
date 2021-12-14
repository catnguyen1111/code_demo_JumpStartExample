import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/interface';
import { DataService } from 'src/app/Services/data.service';
import { CustomerState } from 'src/app/Store/customer.state';
import * as CustomerActions from 'src/app/Store/customer.action';
@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {
  @Select(CustomerState.customer) customers$!: Observable<Customer[]>
  constructor(private dataService: DataService,private store:Store) { }
  form!: FormGroup;
  data!:any;
  ngOnInit(): void {
    this.form = new FormGroup({
      first_name: new FormControl('',Validators.required),
      last_name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),

    })

  }
  onSubmit(){
    console.log("data form",this.form.value);
  }
  addCustomer(first_name: string, last_name: string,email: string){
    console.log("add customer",first_name,last_name,email)
    this.data = {first_name,last_name,email}
    this.store.dispatch(new CustomerActions.AddCustomer(this.data));
    //  this.dataService.addCustomer(this.data).subscribe();
  }
}
