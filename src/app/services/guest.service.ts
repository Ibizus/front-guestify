import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../utils/environment';
import { Observable, map } from 'rxjs';
import { Guest } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private http: HttpClient) {}
  
  getGuests(page: number, size: number, filter: string): Observable<any> {
    return this.http
      .get<any>(
        environment.API_ENDPOINT +
          'guests/?page=' +
          page +
          '&size=' +
          Math.ceil(size) + (filter.length > 0 ? ('&filter=' +
            filter):('')
          ));
  }

  getFilteredGuests(filter: string): Observable<any[]> {
    return this.http
      .get<any[]>(environment.API_ENDPOINT + 'guests/', {
        params: { filter: filter },
      })
      .pipe(
        map((response: any) =>
          response.map((guest: Guest) => guest)
        )
      );
  }

  deleteGuest(id: number): Observable<Guest> {
    return this.http.delete<Guest>(
      environment.API_ENDPOINT + 'guests/' + id
    );
  }


  modifyGuest(guest: Guest): Observable<Object> {
    return this.http.put(
      environment.API_ENDPOINT + 'guests/' + guest.id,
      guest
    );
  }

  createGuest(guest: Guest): Observable<Object> {
    return this.http.post(environment.API_ENDPOINT + 'guests/', guest);
  }
}
