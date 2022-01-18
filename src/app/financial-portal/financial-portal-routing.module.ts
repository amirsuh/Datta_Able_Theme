import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {

    path:'',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      // {
      //   path: 'admin-reassignment',
      //   component: AdminReassignmentComponent,
      // },

      // {
      //   path: 'case-reassignment',
      //   component: CaseReassignmentComponent,
      // },
      // {
      //   path: 'financial-port',
      //   component: FinancialPortComponent,
      // },
      // {
      //   path: 'new-adminn',
      //   component: DashboardUserDetailsComponent,
      // },
      // {
      //   path: 'financial-user-admin',
      //   component: DashboardAdminComponent,
      // },

      // {
      //   path: 'task/:taskCode/:id/:id2',
      //   component: FinancialPortComponent,
      // },
      // {
      //   path: ':id',
      //   component: FinancialPortComponent,
      // },
      // {
      //   path: 'financial-Proposal',
      //   component: ProposalComponent,
      // },
      // {
      //   path: 'financial-Portal-Dashboard',
      //   component: DashboardFinancialPortalComponent,
      // },
      // {
      //   path: 'financial-Portal-Das-checker',
      //   component: DashboardFinancialCheckerComponent,
      // },
      // {
      //   path: 'financial-admin',
      //   component: DashboardAdminComponent,
      // },
      // {
      //   path: 'financial-Portal-Das-User-Details',
      //   component: DashboardUserDetailsComponent,
      // },



    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialPortalRoutingModule { }
