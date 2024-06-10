import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../utils/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {}

  // Receives the action {confirmation, invitation, notification} 
  // and an id used in backed to send an email
  sendEmail(action: string, id: number): Observable<any>{
    return new Observable<any>(observer => {
      this.http.post<any>(environment.API_ENDPOINT
        + 'send/' + action + '/?id=' + id, id)
      .subscribe({
        next: ()=>{
          console.log("Posting email to backend");
        },
        error: () => {
          console.log("Could not POST mail");
        }
      });
      observer.next();
      observer.complete();
    });
  }

}
