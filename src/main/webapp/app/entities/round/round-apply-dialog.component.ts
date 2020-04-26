import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { IRound } from 'app/shared/model/round.model';
import { RoundService } from './round.service';
import { ApplicationService } from 'app/entities/application/application.service';
import { Application, IApplication } from 'app/shared/model/application.model';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  templateUrl: './round-apply-dialog.component.html'
})
export class RoundApplyDialogComponent {
  round: IRound;
  isSaving: Boolean;
  constructor(
    protected applicationService: ApplicationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager,
    private fb: FormBuilder
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmApply(id: number) {
    const application = this.createFromForm(1, 1);
    if (application.id !== undefined) {
      this.subscribeToSaveResponse(this.applicationService.update(application));
    } else {
      this.subscribeToSaveResponse(this.applicationService.create(application));
    }
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApplication>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }
  previousState() {
    window.history.back();
  }
  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  editForm = this.fb.group({
    id: [],
    state: [],
    end: [],
    lastChanged: [],
    profile: [],
    round: []
  });

  private createFromForm(roundID: number, profileID: number): IApplication {
    return {
      ...new Application(),
      id: this.editForm.get(['id']).value,
      state: this.editForm.get(['state']).value,
      end: this.editForm.get(['end']).value,
      lastChanged: this.editForm.get(['lastChanged']).value,
      profile: this.editForm.get(['profile']).value,
      round: this.editForm.get(['round']).value
    };
  }
}
