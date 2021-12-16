import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart ,Event, Router} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Customer } from '../model/interface';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  private searchTerms = new Subject<string>();
  public customers$!: Observable<Customer[]>
  loading: boolean = false;
  check_router: boolean = false;
  timeout:any;
  constructor(private dataService: DataService,private route: Router) {


   }

  ngOnInit(): void {
    this.customers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.dataService.searchCustomer(term)),

    )

  }
  search(term: string): void {
    this.searchTerms.next(term);
    console.log("search",this.searchTerms);
  }

}
