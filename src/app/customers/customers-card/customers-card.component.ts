import { Icu } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Customer } from 'src/app/model/interface';
import { DataService } from 'src/app/Services/data.service';
import { CustomerState } from 'src/app/Store/customer.state';
import * as CustomerActions from 'src/app/Store/customer.action';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router,Event } from '@angular/router';
@Component({
  selector: 'app-customers-card',
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.scss']
})
export class CustomersCardComponent implements OnInit,OnDestroy {
  @Select(CustomerState.customer) customers$!: Observable<Customer[]>
  POSTS:any;
  page:number = 1;
  count:number = 0;
  tableSize:number = 6;
  tableSizes = [3,6,9,12];
  datas!:Observable<Customer[]>;
  data:any;
  public loading:boolean = false;
  public timeout:any;
  public check_router:boolean = false;
  private readonly destroy$ = new Subject();
  constructor(
    public dataService: DataService,
    public store: Store,
    private router: Router
  ){

  }

  ngOnInit(): void {

    this.fetchPosts();

  }
  ngOnDestroy(): void {
    this.destroy$.next()
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
}
