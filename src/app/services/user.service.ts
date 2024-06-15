import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../utils/environment';
import { Observable } from 'rxjs';
import { User } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(page: number, size: number, filter: string): Observable<any> {
    return this.http
      .get<any>(
        environment.API_ENDPOINT +
          'users/?page=' +
          page +
          '&size=' +
          Math.ceil(size) + 
          (filter.length > 0 ? ('&filter=' + filter):('')
      ));
  }

  getUserById(id: number): Observable<any> {
    return this.http
      .get<any>(environment.API_ENDPOINT + 'users/' + id);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(
      environment.API_ENDPOINT + 'users/' + id
    );
  }

  modifyUser(user: User): Observable<Object> {
    return this.http.put(
      environment.API_ENDPOINT + 'users/' + user.id,
      user
    );
  }

  createUser(user: User): Observable<Object> {
    return this.http.post(environment.API_ENDPOINT + 'users/', user);
  }
}
