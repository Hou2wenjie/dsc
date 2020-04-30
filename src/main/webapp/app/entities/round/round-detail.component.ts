import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRound } from 'app/shared/model/round.model';
import { AccountService } from 'app/core/auth/account.service';
import { ApplicationService } from 'app/entities/application/application.service';
import { IApplication } from 'app/shared/model/application.model';
import { State } from 'app/shared/model/enumerations/state.model';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IProfile } from 'app/shared/model/profile.model';
import { isSameTotalToScroll } from 'ngx-infinite-scroll/src/services/scroll-resolver';
import { ApplicationDeleteDialogComponent } from 'app/entities/application/application-delete-dialog.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-round-detail',
  templateUrl: './round-detail.component.html'
})
export class RoundDetailComponent implements OnInit {
  round: IRound;
  applications: IApplication[];
  profiles: IProfile[];
  isSaving: boolean;
  isDeleting: boolean;
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService,
    protected applicationService: ApplicationService,
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected modalService: NgbModal
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.isDeleting = false;
    this.activatedRoute.data.subscribe(({ round }) => {
      this.round = round;
      this.applicationService.getAllByRoundId(this.round.id).subscribe(
        res => {
          this.applications = res.body;
          this.profiles = this.applications.map(app => app.profile);
        },
        // eslint-disable-next-line no-console
        error => console.log(error)
      );
    });
  }

  trackId(index: number, item: IApplication) {
    return item.id;
  }

  previousState() {
    window.history.back();
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  findApplicationFromProfile(profile: IProfile, round: IRound): IApplication {
    return this.applications.filter(app => app.profile.id === profile.id && app.round.id === round.id)[0];
  }

  enrollApplication(profile: IProfile, round: IRound) {
    this.isSaving = true;
    const application = this.applications.filter(app => app.profile.id === profile.id && app.round.id === round.id)[0];
    if (application.state === State.APPROVED) {
      alert('you have already approved this application.');
      return;
    }
    application.state = State.APPROVED;
    this.applicationService.update(application).subscribe(
      () => {
        this.jhiAlertService.success('successful!');
        this.isSaving = false;
      },
      () => {
        this.jhiAlertService.error('error!');
        this.isSaving = false;
      }
    );
  }
  denyApplication(profile: IProfile, round: IRound) {
    this.isSaving = true;
    const application = this.applications.filter(app => app.profile.id === profile.id && app.round.id === round.id)[0];
    if (application.state === State.DENIED) {
      alert('you have already denied this application.');
      return;
    }
    application.state = State.DENIED;
    this.applicationService.update(application).subscribe(
      () => {
        this.jhiAlertService.success('successful!'), (this.isSaving = false);
      },
      () => {
        this.jhiAlertService.error('error!');
        this.isSaving = false;
      }
    );
  }
  deleteApplication(profile: IProfile, round: IRound) {
    this.isDeleting = true;
    const application = this.applications.filter(app => app.profile.id === profile.id && app.round.id === round.id)[0];
    const modalRef = this.modalService.open(ApplicationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.application = application;
    this.previousState();
    //this.applicationService.delete(application.id).subscribe(() => {
    //  this.jhiAlertService.success('successful!');
    //  this.isDeleting = false;
    //}, () => {
    //  this.jhiAlertService.error('error!');
    // this.isDeleting = false;
    //});
  }
  currentCap() {
    if (this.isDeleting === false) {
      return this.applications.length;
    }
  }
}
