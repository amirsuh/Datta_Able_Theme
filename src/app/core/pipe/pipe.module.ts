import { NgModule }      from '@angular/core';
import { AgepipePipe } from '../agepipe/agepipe.pipe';
import { DateFormatPipePipe }          from '../datePipe/date-format-pipe.pipe';
import { DateageingPipe } from '../datePipe/dateageing.pipe';
import { DateageingrefundPipe } from '../datePipe/dateageingrefund.pipe';

@NgModule({
    imports:        [],
    declarations:   [DateFormatPipePipe,DateageingPipe,DateageingrefundPipe,AgepipePipe],
    exports:        [DateFormatPipePipe,DateageingPipe,DateageingrefundPipe,AgepipePipe],
})

export class PipeModule {

  static forRoot() {
     return {
         ngModule: PipeModule,DateageingPipe,DateageingrefundPipe,AgepipePipe,
         providers: [],
     };
  }
}
