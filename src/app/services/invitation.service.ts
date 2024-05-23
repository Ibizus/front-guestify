import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../utils/environment';
import { Observable, map } from 'rxjs';
import { Invitation } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http: HttpClient) {}


  getInvitations(page: number, size: number, filter: string): Observable<any> {
    return this.http
      .get<any>(
        environment.API_ENDPOINT +
          'invitaciones/?page=' +
          page +
          '&size=' +
          Math.ceil(size) + 
          (filter.length > 0 ? ('&filter=' + filter):('')
      ));
  }

  getFilteredInvitations(filter: string): Observable<any[]> {
    return this.http
      .get<any[]>(environment.API_ENDPOINT + 'invitaciones/', {
        params: { filter: filter },
      })
      .pipe(
        map((response: any) =>
          response.map((invitation: Invitation) => invitation)
        )
      );
  }

  deleteInvitation(id: number): Observable<Invitation> {
    return this.http.delete<Invitation>(
      environment.API_ENDPOINT + 'invitaciones/' + id
    );
  }

  modifyInvitation(invitation: Invitation): Observable<Object> {
    return this.http.put(
      environment.API_ENDPOINT + 'invitaciones/' + invitation.id,
      invitation
    );
  }

  createInvitation(invitation: Invitation): Observable<Object> {
    return this.http.post(environment.API_ENDPOINT + 'invitations/', invitation);
  }
}
