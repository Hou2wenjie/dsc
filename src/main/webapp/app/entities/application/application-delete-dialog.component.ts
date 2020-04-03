import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IApplication } from 'app/shared/model/application.model';
import { ApplicationService } from './application.service';

@Component({
  templateUrl: './application-delete-dialog.component.html'
})
export class ApplicationDeleteDialogComponent {
  application: IApplication;

  constructor(
    protected applicationService: ApplicationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.applicationService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'applicationListModification',
        content: 'Deleted an application'
      });
      this.activeModal.dismiss(true);
    });
  }
}
