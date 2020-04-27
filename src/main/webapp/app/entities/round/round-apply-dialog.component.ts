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
import { IProfile } from 'app/shared/model/profile.model';
import * as moment from 'moment';
import { State } from 'app/shared/model/enumerations/state.model';

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

  constructor(
    protected applicationService: ApplicationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager,
    private roundService: RoundService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

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
    //this.broadcast('sss');
    this.getRound(id);
    const application = this.createFromForm();
    if (application.id !== undefined) {
      this.subscribeToSaveResponse(this.applicationService.update(application));
    } else {
      this.subscribeToSaveResponse(this.applicationService.create(application));
    }
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApplication>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }
  protected onSaveSuccess() {
    this.isSaving = false;
    this.clear();
  }

  protected onSaveError() {
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
      profile: null,
      round: this.round
    };
  }
}
