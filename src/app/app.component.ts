import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { DataService } from './Services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public information:any = '';
  dataUser:any;
  title = 'JumpStartExample';
  constructor(private authService: AuthService,private dataService: DataService){

  }
  ngOnInit(): void {
    this.dataService.currentdata.subscribe((data)=>this.dataUser =data)
  }
  logout(){
    localStorage.clear();
    this.authService.logoutUser();
    this.authService.logout();
    console.log("Logout successfully")
  }

}
