import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/interface';
import { DataService } from 'src/app/Services/data.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss']
})
export class DetailCustomerComponent implements OnInit {
  public dataCustomer?:Customer;
  public data!:Customer;
  form!: FormGroup;
  constructor(
    private dataService: DataService,
    private router: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCustomer();


  }
  getCustomer() {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    console.log("id", id)
    this.dataService.getCustomer(id).subscribe((data) => {
      this.dataCustomer = data,
      console.log("Customeraaaa", this.dataCustomer)
      console.log("Customeraaaa id ", this.dataCustomer.id)
      console.log("Customeraaaa first_name", this.dataCustomer.first_name)
      this.form = new FormGroup({
        id:new FormControl(this.dataCustomer.id),
        first_name: new FormControl(this.dataCustomer.first_name),
        last_name: new FormControl(this.dataCustomer.last_name),
        email: new FormControl(this.dataCustomer.email),
        avatar: new FormControl(this.dataCustomer.avatar)
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
    this.dataService.updateCustomer(this.data).subscribe(()=>this.goBack())

  }



}
