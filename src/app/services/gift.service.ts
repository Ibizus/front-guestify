import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../utils/environment';
import { Observable, map } from 'rxjs';
import { Gift } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  constructor(private http: HttpClient) {}

  getGifts(weddingId: number, page: number, size: number, filter: string): Observable<any> {
    return this.http
    .get<any>(
      environment.API_ENDPOINT + 'gifts/?'+
        'id=' + weddingId + 
        '&page=' + page +
        '&size=' + Math.ceil(size) + 
        (filter.length > 0 ? ('&filter=' + filter):('')
      ));
  }

  getFilteredGifts(weddingId: number, filter: string): Observable<any[]> {
    return this.http
      .get<any[]>(environment.API_ENDPOINT + 'gifts/', {
        params: { id: weddingId , filter: filter },
      })
      .pipe(
        map((response: any) =>
          response.map((gift: Gift) => gift)
        )
      );
  }

  deleteGift(id: number): Observable<Gift> {
    return this.http.delete<Gift>(
      environment.API_ENDPOINT + 'gifts/' + id
    );
  }

  modifyGift(gift: Gift): Observable<Object> {
    return this.http.put(
      environment.API_ENDPOINT + 'gifts/' + gift.id,
      gift
    );
  }

  createGift(weddingId: number, gift: Gift): Observable<Object> {
    console.log("mandado regalo desde el create del servicio de front");
    return this.http.post(environment.API_ENDPOINT + 'gifts/' +
      '?id=' + weddingId,
       gift);
  }

}
