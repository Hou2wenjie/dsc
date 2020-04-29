import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { Application, IApplication } from 'app/shared/model/application.model';

type EntityResponseType = HttpResponse<IApplication>;
type EntityArrayResponseType = HttpResponse<IApplication[]>;

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  public resourceUrl = SERVER_API_URL + 'api/applications';

  constructor(protected http: HttpClient) {}

  create(application: IApplication): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(application);
    return this.http
      .post<IApplication>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(application: IApplication): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(application);
    return this.http
      .put<IApplication>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IApplication>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IApplication[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(application: IApplication): IApplication {
    const copy: IApplication = Object.assign({}, application, {
      end: application.end != null && application.end.isValid() ? application.end.format(DATE_FORMAT) : null,
      lastChanged: application.lastChanged != null && application.lastChanged.isValid() ? application.lastChanged.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.end = res.body.end != null ? moment(res.body.end) : null;
      res.body.lastChanged = res.body.lastChanged != null ? moment(res.body.lastChanged) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((application: IApplication) => {
        application.end = application.end != null ? moment(application.end) : null;
        application.lastChanged = application.lastChanged != null ? moment(application.lastChanged) : null;
      });
    }
    return res;
  }

  getAllByRoundId(roundId: number): Observable<HttpResponse<IApplication[]>> {
    const options = createRequestOption({ roundId });
    return this.http
      .get<IApplication[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
}
