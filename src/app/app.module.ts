import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { CustomersCardComponent } from './customers/customers-card/customers-card.component';
import { CustomersGirdComponent } from './customers/customers-gird/customers-gird.component';

import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { DetailCustomerComponent } from './customers/detail-customer/detail-customer.component';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api'
import {InMemoryDataService} from './Services/in-memory-data.service'

import { NgxsModule } from '@ngxs/store';
import { CustomerState } from './Store/customer.state';


import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomersCardComponent,
    CustomersGirdComponent,
    NewCustomerComponent,
    DetailCustomerComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,{ dataEncapsulation: false }
    ),
    NgxsModule.forRoot([CustomerState]),

    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
