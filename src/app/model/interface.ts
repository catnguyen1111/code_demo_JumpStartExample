
import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';

// export class ICustomer{
//   firstName:string;
//   lastName:string;
//   email:string;
//   id?:number;
//   name:string;
//   constructor(id:number, name:string,firstName:string,lastName:string,email:string) {
//     this.id = id;
//     this.name = name;
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email= email;
//   }
// }
export interface IState{
  abbreviation: string;
  name: string;
}
export interface Customer{
  id: number;
  first_name:string;
  last_name:string;
  email:string;
  avatar:string;
}
export interface Partial<Customer>{
  id?: number;
  first_name:string;
  last_name:string;
  email?:string;
  avatar:string;
}

