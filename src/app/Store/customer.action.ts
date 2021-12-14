
import { Customer } from '../model/interface';

export class AddCustomer{
  static readonly type = '[Hero] Add Hero';
  constructor(public payload: Customer){};
}
export class GetCustomer {
  static readonly type = '[Customer] Get Customer';
  constructor(public payload: number) {}
}

export class GetCustomers {
  static readonly type = '[Customers] Get Customers';
}

export class UpdateCustomer {
  static readonly type = '[Hero] Update Hero';
  constructor(public payload: Customer) {}
}

export class DeleteCustomer{
  static readonly type = '[Hero] Delete Hero';
  constructor(public payload: number) {}
}
