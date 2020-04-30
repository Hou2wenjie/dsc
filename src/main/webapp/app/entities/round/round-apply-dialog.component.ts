import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { IRound } from 'app/shared/model/round.model';
import { RoundService } from './round.service';
import { ProfileService } from 'app/entities/profile/profile.service';
import { ApplicationService } from 'app/entities/application/application.service';
import { Application, IApplication } from 'app/shared/model/application.model';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import * as moment from 'moment';
import { State } from 'app/shared/model/enumerations/state.model';
import { AccountService } from 'app/core/auth/account.service';
import { IProfile } from 'app/shared/model/profile.model';

@Component({
  templateUrl: './round-apply-dialog.component.html'
})
export class RoundApplyDialogComponent implements OnInit {
  editForm = this.fb.group({
    id: [],
    state: [],
    end: [],
    lastChanged: [],
    profile: [],
    round: []
  });
  round: IRound;
  isSaving: Boolean;
  applications: IApplication[];
  profile: IProfile;
  num: number;
  constructor(
    protected applicationService: ApplicationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager,
    private roundService: RoundService,
    private fb: FormBuilder,
    protected profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService.query().subscribe(res => {
      this.profile = res.body[0];
    });
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }
  broadcast(s: String) {
    this.eventManager.broadcast({
      name: 'roundListModification',
      content: s
    });
  }
  confirmApply(id: number) {
    this.getRound(id);
    const application = this.createFromForm();
    this.applicationService.getAllByRoundId(id).subscribe(
      res => {
        this.applications = res.body;
        if (this.round.maxCap <= this.applications.length) {
          alert('It is full!');
          this.clear();
          return;
        }
        if (this.applications.map(resx => resx.profile.id).includes(this.profile.id)) {
          alert('you have already applied!');
          this.clear();
          return;
        }
        if (application.id !== undefined) {
          this.subscribeToSaveResponse(this.applicationService.update(application));
        } else {
          this.subscribeToSaveResponse(this.applicationService.create(application));
        }
      },
      () => alert('something badly happened!')
    );
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApplication>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }
  protected onSaveSuccess() {
    this.isSaving = false;
    this.clear();
  }

  protected onSaveError() {
    alert('can not create application(check your profile or something else!)');
    this.isSaving = false;
  }
  private getRound(roundID: number) {
    this.roundService.find(roundID).subscribe(
      (res: HttpResponse<IRound>) => {
        this.round = res.body;
      },
      () => this.onSaveError()
    );
  }
  private createFromForm() {
    return {
      ...new Application(),
      id: undefined,
      state: State.CREATED,
      end: this.round.endTime,
      lastChanged: moment(),
      profile: this.profile,
      round: this.round
    };
  }
}
