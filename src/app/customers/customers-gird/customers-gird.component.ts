import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Customer } from 'src/app/model/interface';
import { DataService } from 'src/app/Services/data.service';
import {Location} from '@angular/common';
import { CustomerState } from 'src/app/Store/customer.state';
import * as CustomerActions from 'src/app/Store/customer.action';
import { Select, Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router,Event } from '@angular/router';
@Component({
  selector: 'app-customers-gird',
  templateUrl: './customers-gird.component.html',
  styleUrls: ['./customers-gird.component.scss']
})
export class CustomersGirdComponent implements OnInit,OnDestroy {
  @Select(CustomerState.customer) customers$!: Observable<Customer[]>
  public datas$ !:Observable<Customer[]>;
  data:any;
  POSTS:any;
  page:number = 1;
  count:number = 0;
  tableSize:number = 6;
  tableSizes = [3,6,9,12];
  public loading:boolean = false;
  public timeout:any;
  public check_router:boolean = false;
  private readonly destroy$ = new Subject();
  constructor(public dataService: DataService,
    private store:Store,
    private location:Location,
    private router:Router,
    )
  {


  }
  ngOnInit(): void {
    this.fetchPosts();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  fetchPosts():void {
    this.store.dispatch(new CustomerActions.GetCustomers())
    .pipe(takeUntil(this.destroy$))
    .subscribe(_=>{
      this.customers$.subscribe(
        (response )=>{
          this.POSTS = response;
          console.log("response",response);
        },
        error => {
          console.log(error);
        }
      )
    })
  }
  onTableDataChange(event:any){
    this.page = event;
    this.fetchPosts();
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
