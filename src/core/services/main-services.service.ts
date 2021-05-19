import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {task} from '../Models/task.interface';
import {user} from '../Models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class MainServicesService {

  constructor(private http: HttpClient) {
  }


  signIn(credentials): Observable<any> {
    const body = JSON.stringify(credentials);
    return this.http.post<any>(environment.server_url + '/api/Authentication/Login', body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  addTask(task: task): Observable<void> {
    const body = JSON.stringify(task);
    return this.http.post<void>(environment.server_url + '/api/Tasks/CreateTask', body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getTask(): Observable<task[]> {
    return this.http.get<task[]>(environment.server_url + '/api/Tasks');
  }

  deleteTask(taskId:string):Observable<void>{
    return this.http.delete<void>(environment.server_url + '/api/Tasks',{params:{id:taskId}});
  }

  modifyTask(task: task): Observable<void> {
      const body = JSON.stringify(task);
      return this.http.patch<void>(environment.server_url + '/api/Tasks', body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }
  addUser(user: user): Observable<void> {
    const body = JSON.stringify(user);
    return this.http.post<void>(environment.server_url + '/api/Authentication/Register', body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}
