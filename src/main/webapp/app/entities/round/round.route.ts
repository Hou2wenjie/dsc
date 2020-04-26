import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Round } from 'app/shared/model/round.model';
import { RoundService } from './round.service';
import { RoundComponent } from './round.component';
import { RoundDetailComponent } from './round-detail.component';
import { RoundUpdateComponent } from './round-update.component';
import { IRound } from 'app/shared/model/round.model';
import { RoundApplyDialogComponent } from 'app/entities/round/round-apply-dialog.component';

@Injectable({ providedIn: 'root' })
export class RoundResolve implements Resolve<IRound> {
  constructor(private service: RoundService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRound> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((round: HttpResponse<Round>) => round.body));
    }
    return of(new Round());
  }
}

export const roundRoute: Routes = [
  {
    path: '',
    component: RoundComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rounds'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RoundDetailComponent,
    resolve: {
      round: RoundResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rounds'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RoundUpdateComponent,
    resolve: {
      round: RoundResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rounds'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RoundUpdateComponent,
    resolve: {
      round: RoundResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rounds'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/apply',
    component: RoundApplyDialogComponent
  }
];
