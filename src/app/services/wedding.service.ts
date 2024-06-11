import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../utils/environment';
import { Observable, map } from 'rxjs';
import { Wedding } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class WeddingService {

  constructor(private http: HttpClient) {}

  getWeddings(page: number, size: number, filter: string): Observable<any> {
    return this.http
      .get<any>(
        environment.API_ENDPOINT +
          'weddings/?page=' +
          page +
          '&size=' +
          Math.ceil(size) + 
          (filter.length > 0 ? ('&filter=' + filter):('')
      ));
  }

  getWeddingById(id: number): Observable<any> {
    return this.http
      .get<any>(environment.API_ENDPOINT + 'weddings/' + id);
  }

  getWeddingsByUserId(userid: number): Observable<any> {
    return this.http
      .get<any>(environment.API_ENDPOINT + 'weddings/', {
        params: { user: userid },
      })
  }

  deleteWedding(id: number): Observable<Wedding> {
    return this.http.delete<Wedding>(
      environment.API_ENDPOINT + 'Weddings/' + id
    );
  }

  modifyWedding(wedding: Wedding): Observable<Object> {
    return this.http.put(
      environment.API_ENDPOINT + 'weddings/' + wedding.id,
      wedding
    );
  }

  createWedding(wedding: Wedding): Observable<Object> {
    return this.http.post(environment.API_ENDPOINT + 'weddings/', wedding);
  }
}
