import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  crudURL = 'https://crudcrud.com/api/6390a569a4184e1c950d481a71c7b5be';

  addTask(task: any): Observable<Object> {
    return this.http.post(`${this.crudURL}/tasks`, task);
  }

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${this.crudURL}/tasks`);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.crudURL}/tasks/${id}`);
  }
}
