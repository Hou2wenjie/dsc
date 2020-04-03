import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IApplication, Application } from 'app/shared/model/application.model';
import { ApplicationService } from './application.service';
import { IProfile } from 'app/shared/model/profile.model';
import { ProfileService } from 'app/entities/profile/profile.service';
import { IRound } from 'app/shared/model/round.model';
import { RoundService } from 'app/entities/round/round.service';

@Component({
  selector: 'jhi-application-update',
  templateUrl: './application-update.component.html'
})
export class ApplicationUpdateComponent implements OnInit {
  isSaving: boolean;

  profiles: IProfile[];

  rounds: IRound[];
  endDp: any;
  lastChangedDp: any;

  editForm = this.fb.group({
    id: [],
    state: [],
    end: [],
    lastChanged: [],
    profile: [],
    round: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected applicationService: ApplicationService,
    protected profileService: ProfileService,
    protected roundService: RoundService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ application }) => {
      this.updateForm(application);
    });
    this.profileService
      .query()
      .subscribe((res: HttpResponse<IProfile[]>) => (this.profiles = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.roundService
      .query()
      .subscribe((res: HttpResponse<IRound[]>) => (this.rounds = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(application: IApplication) {
    this.editForm.patchValue({
      id: application.id,
      state: application.state,
      end: application.end,
      lastChanged: application.lastChanged,
      profile: application.profile,
      round: application.round
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const application = this.createFromForm();
    if (application.id !== undefined) {
      this.subscribeToSaveResponse(this.applicationService.update(application));
    } else {
      this.subscribeToSaveResponse(this.applicationService.create(application));
    }
  }

  private createFromForm(): IApplication {
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApplication>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProfileById(index: number, item: IProfile) {
    return item.id;
  }

  trackRoundById(index: number, item: IRound) {
    return item.id;
  }
}
