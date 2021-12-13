import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,of,throwError } from 'rxjs';
import { Partial,IState,Customer } from '../model/interface';
import {map, catchError, tap, } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public Url = 'https://reqres.in/api/users?page=2'
  public UrlPost = 'https://reqres.in/api/users'
  public UrlCustomer = 'api/customers'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }
  getCustomeres():Observable<Customer[]> {
    return this.http.get<Customer[]>(this.UrlCustomer)
    .pipe(
      tap((customer: Customer[]) => console.log(`get customer w/ id=${JSON. stringify(customer)} `)),
      catchError(this.handleError<Customer[]>('getCustomers',[]))
      );
  }
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.UrlCustomer, customer, this.httpOptions).pipe(
      tap((customer: Customer) => console.log(`added customer w/ id=${customer.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }
  updateCustomer(customer: Customer): Observable<any>{
    return this.http.put(this.UrlCustomer, customer, this.httpOptions).pipe(
      tap(_ => console.log(`updated customer id=${customer.id}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }
  getCustomer(id: number): Observable<Customer>{
    const url = `${this.UrlCustomer}/${id}`;
    return this.http.get<Customer>(url).pipe(

      tap(_=>console.log(`fetched customer id = ${id}`)),
      catchError(this.handleError<Customer>(`getcustomer id = ${id}`)),

    )
  }
  deleteCustomer(id: number): Observable<Customer> {
    const url = `${this.UrlCustomer}/${id}`;
    return this.http.delete<Customer>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted customer id=${id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }
  searchCustomer(term: string): Observable<Customer[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Customer[]>(`${this.UrlCustomer}/?name=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found customer matching "${term}"`) :
        console.log(`no customer matching "${term}"`)),
        catchError(this.handleError<Customer[]>('searchCustomer', []))
    );
  }
  private handleError<T>(operation  = 'operation',result?: T){
    return (error : any): Observable<T> => {
      console.error(error)
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
