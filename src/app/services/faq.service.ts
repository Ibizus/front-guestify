import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../utils/environment';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) {}

  getFaqs(): Observable<any> {
    return this.http
      .get<any>(
        environment.API_ENDPOINT + 'faqs');
  }
}
