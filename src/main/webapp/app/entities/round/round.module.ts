import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DscSharedModule } from 'app/shared/shared.module';
import { RoundComponent } from './round.component';
import { RoundDetailComponent } from './round-detail.component';
import { RoundUpdateComponent } from './round-update.component';
import { RoundApplyDialogComponent } from './round-apply-dialog.component';
import { RoundDeleteDialogComponent } from './round-delete-dialog.component';
import { roundRoute } from './round.route';
import { ApplicationDeleteDialogComponent } from 'app/entities/application/application-delete-dialog.component';

@NgModule({
  imports: [DscSharedModule, RouterModule.forChild(roundRoute)],
  declarations: [
    RoundComponent,
    RoundDetailComponent,
    RoundUpdateComponent,
    RoundDeleteDialogComponent,
    RoundApplyDialogComponent,
    ApplicationDeleteDialogComponent
  ],
  entryComponents: [RoundDeleteDialogComponent, RoundApplyDialogComponent, ApplicationDeleteDialogComponent]
})
export class DscRoundModule {}
