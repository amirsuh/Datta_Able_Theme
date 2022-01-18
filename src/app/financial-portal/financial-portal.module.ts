import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FinancialPortalRoutingModule } from './financial-portal-routing.module';
import { PipeModule } from '../core/pipe/pipe.module';
import { MaterialsModule } from 'src/materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FinancialPortalRoutingModule,
    PipeModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FinancialPortalModule { }
