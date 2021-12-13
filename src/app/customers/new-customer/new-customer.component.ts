import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/interface';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {

  constructor(private dataService: DataService) { }
  form!: FormGroup;
  data!:Customer;
  ngOnInit(): void {
    this.form = new FormGroup({
      id:new FormControl(''),
      first_name: new FormControl('',Validators.required),
      last_name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      avatar:new FormControl(''),
    })

  }
  onSubmit(){
    console.log("data form",this.form.value);
  }
  addCustomer(id:number,first_name: string, last_name: string,email: string,avatar: string){
    console.log("add customer",first_name,last_name,email)
    this.data= {id,first_name,last_name,email,avatar}
    console.log("add customer dddd",this.data)
     this.dataService.addCustomer(this.data).subscribe();
  }
}
