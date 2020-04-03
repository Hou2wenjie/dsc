import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRound } from 'app/shared/model/round.model';
import { RoundService } from './round.service';

@Component({
  templateUrl: './round-delete-dialog.component.html'
})
export class RoundDeleteDialogComponent {
  round: IRound;

  constructor(protected roundService: RoundService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.roundService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'roundListModification',
        content: 'Deleted an round'
      });
      this.activeModal.dismiss(true);
    });
  }
}
