import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IRound } from 'app/shared/model/round.model';
import { RoundService } from './round.service';
import { RoundDeleteDialogComponent } from './round-delete-dialog.component';
import { RoundApplyDialogComponent } from 'app/entities/round/round-apply-dialog.component';
import { AccountService } from 'app/core/auth/account.service';
import { RoundDetailComponent } from 'app/entities/round/round-detail.component';
import { ApplicationService } from 'app/entities/application/application.service';
import { IApplication } from 'app/shared/model/application.model';

@Component({
  selector: 'jhi-round',
  templateUrl: './round.component.html'
})
export class RoundComponent implements OnInit, OnDestroy {
  rounds: IRound[];
  eventSubscriber: Subscription;
  applications: IApplication[];
  constructor(
    protected http: HttpClient,
    protected roundService: RoundService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected accountService: AccountService,
    protected applicationService: ApplicationService
  ) {}

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
  apply(round: IRound) {
    const modalRef = this.modalService.open(RoundApplyDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.round = round;
  }
  hasOnlyUserAccess() {
    return this.accountService.hasAnyAuthority('ROLE_USER') && !this.accountService.hasAnyAuthority('ROLE_ADMIN');
  }
  hasAdminAccess() {
    return this.accountService.hasAnyAuthority('ROLE_ADMIN');
  }
}
