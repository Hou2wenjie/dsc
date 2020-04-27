import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IApplication } from 'app/shared/model/application.model';
import { ApplicationService } from './application.service';
import { ApplicationDeleteDialogComponent } from './application-delete-dialog.component';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-application',
  templateUrl: './application.component.html'
})
export class ApplicationComponent implements OnInit, OnDestroy {
  applications: IApplication[];
  eventSubscriber: Subscription;

  constructor(
    protected applicationService: ApplicationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.applicationService.query().subscribe((res: HttpResponse<IApplication[]>) => {
      this.applications = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInApplications();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IApplication) {
    return item.id;
  }

  registerChangeInApplications() {
    this.eventSubscriber = this.eventManager.subscribe('applicationListModification', () => this.loadAll());
  }

  delete(application: IApplication) {
    const modalRef = this.modalService.open(ApplicationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.application = application;
  }
}
