import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/interface';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-customers-gird',
  templateUrl: './customers-gird.component.html',
  styleUrls: ['./customers-gird.component.scss']
})
export class CustomersGirdComponent implements OnInit {

  public datas$ !:Observable<Customer[]>;
  constructor(public dataService: DataService) { }

  data:any;

  ngOnInit(): void {
   this.dataService.getCustomeres().subscribe(customer => {
      console.log("customer gird",customer);
      this.data = customer;
    })
  }
  delete(customer:Customer):void {

    console.log("delete",customer.id)
    this.dataService.deleteCustomer(customer.id).subscribe()
    this.dataService.getCustomeres().subscribe(customer => {
      console.log("customer gird",customer);
      this.data = customer;
    })

  }

}
