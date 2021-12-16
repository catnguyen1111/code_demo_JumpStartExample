import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Event, Router } from '@angular/router';
import * as CustomValidation from 'src/app/customValidation/customValidation'
import { AppComponent } from '../app.component';
import { AuthService } from '../Services/auth.service';
import { DataService } from '../Services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  public data: string|null =''
  loading: boolean = false;
  timeout:any;
  check_router: boolean = false;
  constructor(private authService: AuthService,private dataService: DataService,  private route: Router) {

  }
  loginAdmin = {
    username : "admin",
    email: "admin@gmail.com",
    password : "admin"

  }
  loginUser = {
    username : "user",
    email: "user@gmail.com",
    password : "user"

  }
  ngOnInit(): void {
    this.loginForm =  new FormGroup({
      username: new FormControl('', [Validators.required,CustomValidation.validationCheckMinLength(3)]),
      email: new FormControl('', [Validators.required,CustomValidation.newCustomervalidateEmail]),
      password: new FormControl('', [Validators.required,CustomValidation.validationCheckMinLength(3)])
    })
  }
  onSubmit(): void {
    if(JSON.stringify(this.loginForm.value) === JSON.stringify(this.loginAdmin)){
      console.log(" Admin Login successfully");
      localStorage.setItem("username",this.loginForm.value.username);
      localStorage.setItem("email",this.loginForm.value.email);
      localStorage.setItem("password",this.loginForm.value.password);
      this.authService.loginUser();
      this.authService.login();
      this.data = localStorage.getItem('username')
      // this.dataService.setDataUser(this.loginForm.value.username)
       this.dataService.setDataUser(this.data)
      this.route.navigate(['/customers'])



    }
    else if(JSON.stringify(this.loginForm.value) === JSON.stringify(this.loginUser)){
      console.log(" User Login successfully");
      localStorage.setItem("username",this.loginForm.value.username);
      localStorage.setItem("email",this.loginForm.value.email);
      localStorage.setItem("password",this.loginForm.value.password);
      this.authService.loginUser();
      this.authService.login();
      this.data = localStorage.getItem('username')
      // this.dataService.setDataUser(this.loginForm.value.username)
      this.dataService.setDataUser(this.data)
      this.route.navigate(['/customers'])
    }
    else{
      console.log("Login failed");
    }

  }





}
