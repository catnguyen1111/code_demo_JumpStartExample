import { Component, Input, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router,Event } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { DataService } from './Services/data.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public information:any = '';
  dataUser:any;
  loading:boolean = false;
  timeout:any;
  title = 'JumpStartExample';
  constructor(private authService: AuthService,
    private dataService: DataService,
    private  router: Router,
    private location: Location,
    )
  {
    this.router.events.subscribe((event:Event) => {
      switch(true){
        case event instanceof NavigationStart:{

          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:{
          this.timeout = setTimeout(() => {
            clearTimeout(this.timeout);
            this.loading = false;

         }, 1);
          break;
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationError:{
          this.loading = false;
          break;
        }
        default:{
          break;
        }

      }
    })
  }
  ngOnInit(): void {
    this.dataService.currentdata.subscribe((data)=>this.dataUser =data)
    // kiểm tra khi trang bị reload
    if( this.router.onSameUrlNavigation === 'reload'){
      if(localStorage.getItem('username')!== null){
        this.dataUser = localStorage.getItem('username')
        if(this.dataUser === 'user'){
          this.authService.loginUser();
          this.authService.login();
        }
        else if(this.dataUser === 'admin'){
          this.authService.loginUser();
          this.authService.login();
        }
      }

    }

  }
  logout(){
    localStorage.clear();
    this.authService.logoutUser();
    this.authService.logout();
    this.dataUser = ''
    console.log("Logout successfully")
  }

}
