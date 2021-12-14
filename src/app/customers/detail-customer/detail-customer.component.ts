import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/interface';
import { DataService } from 'src/app/Services/data.service';
import {Location} from '@angular/common';
import { CustomerState } from 'src/app/Store/customer.state';
import { Select, Store } from '@ngxs/store';
import * as CustomerActions from 'src/app/Store/customer.action';
@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss']
})
export class DetailCustomerComponent implements OnInit {
  @Select(CustomerState.selectedCustomer) customers$!: Observable<Customer>
  public dataCustomer!:Customer;
  public data!:Customer;
  public data_test!:any;
  form!: FormGroup;
  constructor(
    private dataService: DataService,
    private router: ActivatedRoute,
    private location: Location,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getCustomer();


  }
  getCustomer() {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.store.dispatch(new CustomerActions.GetCustomer(id));
    this.customers$.subscribe((data)=> {
      this.data_test = data
      this.form = new FormGroup({
        id:new FormControl (this.data_test.id),
        first_name : new FormControl (this.data_test.first_name),
        last_name : new FormControl (this.data_test.last_name),
        email : new FormControl (this.data_test.email),
        avatar : new FormControl (this.data_test.avatar)
      })
    })

  }
  goBack(){
    this.location.back();
  }
  onsubmit(){
    console.log("form",this.form.value)
  }
  save(id:number,first_name:string, last_name:string,email:string,avatar:string){
    console.log("save",first_name,last_name,email)
    this.data = {id,email,first_name,last_name,avatar}
    this.store.dispatch(new CustomerActions.UpdateCustomer(this.data)).subscribe(()=>this.goBack());

    // this.dataService.updateCustomer(this.data).subscribe(()=>this.goBack())

  }



}


