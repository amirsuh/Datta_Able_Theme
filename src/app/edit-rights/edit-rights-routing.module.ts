import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { NewERRequestComponent } from './new-er-request/new-er-request.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NewErRequestComponent } from './new-er-request/new-er-request.component';
// import { EditRightMasterComponent } from './edit-right-master/edit-right-master.component';
// import { SaveERRequestComponent } from './save-er-request/save-er-request.component';
// import { CanDeactivateGuard } from './guard/can-deactivate/can-deactivate.guard';
import { NtuBulkDashboardComponent } from './ntu-bulk-dashboard/ntu-bulk-dashboard.component';
// import { NtuBulkRequestComponent } from './ntu-bulk-request/ntu-bulk-request.component';
// import { ViewBulkRequestComponent } from './view-bulk-request/view-bulk-request.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Edit Right Request Dashboard'
        },
      },
      // {
      //   path: 'edit-rights',
      //   component: DashboardComponent,
      //   data: {
      //     title: 'Edit Right Request Dashboard'
      //   },
      // },
      // {
      //   path: 'save-edit-rights-request/:id',
      //   component: SaveERRequestComponent,
      //   data: {
      //     title: 'Save Edit Right Request'
      //   },

      // },
      {
        path: 'new-er-request',
        component: NewErRequestComponent,
        data: {
          title: 'New ER Request'
        },
      //   // canDeactivate: [CanDeactivateGuard]

      },
      {
        path: 'ntu-bulk-dashboard',
        component: NtuBulkDashboardComponent,
        data: {
          title: 'NTU Bulk Dashboard'
        },
      },
      // {
      //   path: 'view-bulk-request/:id',
      //   component: ViewBulkRequestComponent,
      //   data: {
      //     title: 'View Ntu Bulk Request'
      //   },

      // },
      // {
      //   path: 'ntu-bulk-request',
      //   component: NtuBulkRequestComponent,
      //   data: {
      //     title: 'NTU Bulk Request'
      //   },
      // },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRightsRoutingModule {}
