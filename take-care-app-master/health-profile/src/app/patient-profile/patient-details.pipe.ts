import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'patientDetails'
})
export class PatientDetailsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(Object.keys(value));
    console.log(Object.keys(value).map(key => value[key]));
    //  return Object.keys(value).map(key => value[key]);
    return Object.keys(value).map(key => value[key])
  }

}
