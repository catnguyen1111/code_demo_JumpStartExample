import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";

export function newCustomervalidateEmail(control: FormControl){
  const Email_Regexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  return Email_Regexp.test(control.value) ? null :{
    validateEmail : true

  }
}
export function validationCheckMinLength(min:number):ValidatorFn{
  return (control:AbstractControl):{[key:string]:boolean} | null => {

    if(control.value && (control.value.length < min)){
      return { checkMinLength : true };
    }
    else{
      return {checkMinLength : false};
    }

  }

}
export function validationCheckMaxLength(max:number):ValidatorFn{
  return (control:AbstractControl):{[key:string]:boolean} | null => {

    if(control.value && (control.value.length < max)){
      return { checkMaxLength : false};
    }
    else{
      return {checkMaxLength : true};
    }

  }

}
