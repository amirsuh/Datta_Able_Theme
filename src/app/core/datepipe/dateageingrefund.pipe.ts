import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateageingrefund'
})
export class DateageingrefundPipe implements PipeTransform {

  transform(value: number): string {

    if(value!=null){
      const hours: number = Math.floor(value / (1000 * 60 * 60));
      var minutes = Math.floor(value / 60000);

      if (hours >= 0) {
        if (hours > 24) {
          const actualDt: number = Math.trunc(hours / 24)
          if (actualDt < 10) return '0' + actualDt;
          if (actualDt > 10)  return '' + actualDt;
        }
        return '' + '0';
      }
    }
    else{
      return '' + '0';
    }




  }

}
