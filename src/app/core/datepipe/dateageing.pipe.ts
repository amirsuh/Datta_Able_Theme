import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateageing'
})
export class DateageingPipe implements PipeTransform {

  transform(value: number): string {
    if(value!=null){
      const hours: number = Math.floor(value / (1000 * 60 * 60));
      // const minutes: number = Math.floor(hours * 60);
      var minutes = Math.floor(value / 60000);
      // const seconds = minutes % 60;
      // console.log(hours)

      if (hours <= 10) {
        if (hours == 0 && minutes < 10) {
          return '0' + minutes + ' ' + 'minutes';
        }
        if (hours == 0 && minutes >= 10) {
          return + minutes + ' ' + 'minutes';
        }
        if (hours == 10) {
          return hours + ' ' + 'hours';
        }
        if (hours > 0) {
          return '0' + hours + ' ' + 'hours';
        }
        else {
          return hours + ' ' + 'hours';
        }

      }
      if (hours > 10) {
        if (hours > 24) {
          const actualDt: number = Math.trunc(hours / 24)
          if (actualDt < 10) {
            return '0' + actualDt + ' ' + 'days'
          }
          if (actualDt > 10) {
            return '' + actualDt + ' ' + 'days'
          }
        }
        return '' + hours + ' ' + 'hours';
      }
    }
    else{
      return "";
    }




  }

}
