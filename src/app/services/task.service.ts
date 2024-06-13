import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../utils/environment';
import { Observable, map } from 'rxjs';
import { Task } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  getTasks(weddingId: number, page: number, size: number, filter: string): Observable<any> {
    return this.http
    .get<any>(
      environment.API_ENDPOINT + 'tasks/?'+
        'id=' + weddingId + 
        '&page=' + page +
        '&size=' + Math.ceil(size) + 
        (filter.length > 0 ? ('&filter=' + filter):('')
      ));
  }

  getFilteredTasks(weddingId: number, filter: string): Observable<any[]> {
    return this.http
      .get<any[]>(environment.API_ENDPOINT + 'tasks/', {
        params: { id: weddingId , filter: filter },
      })
      .pipe(
        map((response: any) =>
          response.map((task: Task) => task)
        )
      );
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(
      environment.API_ENDPOINT + 'tasks/' + id
    );
  }

  modifyTask(task: Task): Observable<Object> {
    return this.http.put(
      environment.API_ENDPOINT + 'tasks/' + task.id,
      task
    );
  }

  createTask(task: Task): Observable<Object> {
    return this.http.post(environment.API_ENDPOINT + 'tasks/', task);
  }
}
