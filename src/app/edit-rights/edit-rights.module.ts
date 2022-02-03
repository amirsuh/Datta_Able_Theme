// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

// Theme Routing
import { EditRightsRoutingModule } from './edit-rights-routing.module';
// import { EditRightMasterComponent } from './edit-right-master/edit-right-master.component';
// import { PolicyProposerComponent } from './er-policy-proposer-details/policy-proposer.component';
import { MatExpansionModule} from '@angular/material/expansion';
// import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { ReactiveFormsModule } from '@angular/forms';
// import { NewERRequestComponent } from './new-er-request/new-er-request.component';
// import { MaterialsModule } from '../materials/materials.module';
// import { SaveERRequestComponent } from './save-er-request/save-er-request.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

// Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { NtuBulkDashboardComponent } from './ntu-bulk-dashboard/ntu-bulk-dashboard.component';

// import { CanDeactivateGuard } from './guard/can-deactivate/can-deactivate.guard';
// import { NtuBulkRequestComponent } from './ntu-bulk-request/ntu-bulk-request.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
// import { CKEditorModule } from 'ckeditor4-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { DashboardModule } from '../dashboard/dashboard.module';
import { DatePipe } from '@angular/common'
import { MaterialsModule } from 'src/materials/materials.module';
import { PipeModule } from '../core/pipe/pipe.module';
import { NewErRequestComponent } from './new-er-request/new-er-request.component';
import { NtuBulkDashboardComponent } from './ntu-bulk-dashboard/ntu-bulk-dashboard.component';
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
// import { ViewBulkRequestComponent } from './view-bulk-request/view-bulk-request.component';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { PipeModule }    from '../core/pipemodule/pipemodule.module';
@NgModule({
  imports: [
    CommonModule,
    EditRightsRoutingModule,
    MatExpansionModule,
    // AccordionModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule,
    // MaterialsModule,
    TabsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    NgxDocViewerModule,
    CKEditorModule,
    // DashboardModule,
    // NgxMatSelectSearchModule,
    // Ng2SearchPipeModule,
    PipeModule
  ],
  providers:[
    // CanDeactivateGuard,
    DatePipe],
  declarations: [
    DashboardComponent,
    NewErRequestComponent,
    NtuBulkDashboardComponent,
    // SaveERRequestComponent,
    // EditRightMasterComponent,
    // PolicyProposerComponent,
    // NewERRequestComponent,
    // NtuBulkDashboardComponent,
    // NtuBulkRequestComponent,
    // ViewBulkRequestComponent,

  ]
})
export class EditRightsModule { }
