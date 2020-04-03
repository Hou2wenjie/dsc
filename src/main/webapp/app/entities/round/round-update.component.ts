import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IRound, Round } from 'app/shared/model/round.model';
import { RoundService } from './round.service';

@Component({
  selector: 'jhi-round-update',
  templateUrl: './round-update.component.html'
})
export class RoundUpdateComponent implements OnInit {
  isSaving: boolean;
  startTimeDp: any;
  endTimeDp: any;

  editForm = this.fb.group({
    id: [],
    startTime: [],
    endTime: [],
    maxCap: [],
    currentCap: []
  });

  constructor(protected roundService: RoundService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ round }) => {
      this.updateForm(round);
    });
  }

  updateForm(round: IRound) {
    this.editForm.patchValue({
      id: round.id,
      startTime: round.startTime,
      endTime: round.endTime,
      maxCap: round.maxCap,
      currentCap: round.currentCap
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const round = this.createFromForm();
    if (round.id !== undefined) {
      this.subscribeToSaveResponse(this.roundService.update(round));
    } else {
      this.subscribeToSaveResponse(this.roundService.create(round));
    }
  }

  private createFromForm(): IRound {
    return {
      ...new Round(),
      id: this.editForm.get(['id']).value,
      startTime: this.editForm.get(['startTime']).value,
      endTime: this.editForm.get(['endTime']).value,
      maxCap: this.editForm.get(['maxCap']).value,
      currentCap: this.editForm.get(['currentCap']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRound>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
