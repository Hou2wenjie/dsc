import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRound } from 'app/shared/model/round.model';
import { RoundService } from './round.service';
import { RoundDeleteDialogComponent } from './round-delete-dialog.component';

@Component({
  selector: 'jhi-round',
  templateUrl: './round.component.html'
})
export class RoundComponent implements OnInit, OnDestroy {
  rounds: IRound[];
  eventSubscriber: Subscription;

  constructor(protected roundService: RoundService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.roundService.query().subscribe((res: HttpResponse<IRound[]>) => {
      this.rounds = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInRounds();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRound) {
    return item.id;
  }

  registerChangeInRounds() {
    this.eventSubscriber = this.eventManager.subscribe('roundListModification', () => this.loadAll());
  }

  delete(round: IRound) {
    const modalRef = this.modalService.open(RoundDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.round = round;
  }
}
