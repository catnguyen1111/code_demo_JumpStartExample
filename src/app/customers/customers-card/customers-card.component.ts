import { Icu } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/model/interface';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-customers-card',
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.scss']
})
export class CustomersCardComponent implements OnInit {

  constructor(public dataService: DataService) { }
  datas!:Observable<Customer[]>;
  data:any;
  ngOnInit(): void {
  this.dataService.getCustomeres().subscribe((customers)=>{
     console.log("customers",customers),
      this.data = customers,
     console.log("data1",this.data)
     })
  }

}
