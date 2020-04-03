import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRound } from 'app/shared/model/round.model';

type EntityResponseType = HttpResponse<IRound>;
type EntityArrayResponseType = HttpResponse<IRound[]>;

@Injectable({ providedIn: 'root' })
export class RoundService {
  public resourceUrl = SERVER_API_URL + 'api/rounds';

  constructor(protected http: HttpClient) {}

  create(round: IRound): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(round);
    return this.http
      .post<IRound>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(round: IRound): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(round);
    return this.http
      .put<IRound>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRound>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRound[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(round: IRound): IRound {
    const copy: IRound = Object.assign({}, round, {
      startTime: round.startTime != null && round.startTime.isValid() ? round.startTime.format(DATE_FORMAT) : null,
      endTime: round.endTime != null && round.endTime.isValid() ? round.endTime.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startTime = res.body.startTime != null ? moment(res.body.startTime) : null;
      res.body.endTime = res.body.endTime != null ? moment(res.body.endTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((round: IRound) => {
        round.startTime = round.startTime != null ? moment(round.startTime) : null;
        round.endTime = round.endTime != null ? moment(round.endTime) : null;
      });
    }
    return res;
  }
}
