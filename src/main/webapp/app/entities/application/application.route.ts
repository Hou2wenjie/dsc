import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Application } from 'app/shared/model/application.model';
import { ApplicationService } from './application.service';
import { ApplicationComponent } from './application.component';
import { ApplicationDetailComponent } from './application-detail.component';
import { ApplicationUpdateComponent } from './application-update.component';
import { IApplication } from 'app/shared/model/application.model';

@Injectable({ providedIn: 'root' })
export class ApplicationResolve implements Resolve<IApplication> {
  constructor(private service: ApplicationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IApplication> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((application: HttpResponse<Application>) => application.body));
    }
    return of(new Application());
  }
}

export const applicationRoute: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Applications'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ApplicationDetailComponent,
    resolve: {
      application: ApplicationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Applications'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ApplicationUpdateComponent,
    resolve: {
      application: ApplicationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Applications'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ApplicationUpdateComponent,
    resolve: {
      application: ApplicationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Applications'
    },
    canActivate: [UserRouteAccessService]
  }
];
