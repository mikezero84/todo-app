import { Injectable } from '@angular/core';
import { ITaskModel } from '../models/task-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { EndPointsDefinition } from 'app/config/api-endpoints.config';
import { map, catchError } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

    public getTodoTasks(): Observable<ITaskModel[]> {

      const httpHeaders = new HttpHeaders();
      httpHeaders.append('dummy-header', 'advancio-awesomeness')

      return this.http
        .get<ITaskModel[]>(
          EndPointsDefinition.getTasksUrl, {
            headers: httpHeaders
          }
        ).pipe(
          map(response => response),
          catchError(error => {
            return throwError(error);
          })
        );
    }

    public isUserAdmin(): Observable<boolean> {

      const httpHeaders = new HttpHeaders();
      httpHeaders.append('dummy-header', 'advancio-awesomeness')

      return this.http
        .get<boolean>(
          EndPointsDefinition.isAdminUrl, {
            headers: httpHeaders
          }
        ).pipe(
          map(response => {
            response = Math.random() >= 0.5;
            console.log('isAdmin:', response);
            return response
          }),
          catchError(error => {
            return throwError(error);
          })
        );
    }
  }
