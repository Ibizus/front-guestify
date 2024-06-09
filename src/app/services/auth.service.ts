import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {Observable, throwError} from "rxjs";
// import {AppComponent} from "./app.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiAuthURL = "http://localhost:8080/api/auth/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient, 
    private storageService: StorageService) { }


  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(
      this.apiAuthURL + 'login',
      {
        email,
        password,
      },
      this.httpOptions
    );
  }

  /* Al JWT Stateless no hace falta enviar petición al backend
    logout(): Observable<any> {
      return this.httpClient.post(this.apiURL + 'logout', { }, this.httpOptions);
    }
  */

  register(username: string, password: string, email: string, rol: string): Observable<any> {
    let registerRequest = 
    { 
      "username": username,
      "password": password,
      "email": email,
      "roles": [rol]
    };

    return this.httpClient.post(
      this.apiAuthURL + 'register',
      JSON.stringify(registerRequest),
      this.httpOptions
    );
  }

  logout() {
    this.storageService.clean();
  }

  errorHandler(error: any) {

    //this.storageService.clean();

    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }

}
