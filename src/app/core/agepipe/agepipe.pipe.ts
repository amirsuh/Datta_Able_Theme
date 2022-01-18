import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'agepipe'
})
export class AgepipePipe implements PipeTransform {

  transform(value: Date): string {

    let today = moment();
                let birthdate = moment(value);
                let years = today.diff(birthdate, 'years');
                let html:string = years + " yr ";

                // html += today.subtract(years, 'years').diff(birthdate, 'months') ;

    return html;
  }

}
