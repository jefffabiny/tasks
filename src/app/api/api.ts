import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  crudURL = 'https://crudcrud.com/api/e7660de50c6f460d999194306b13cef1';

  addTask(task: any): Observable<Object> {
    return this.http.post(`${this.crudURL}/tasks`, task);
  }

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${this.crudURL}/tasks`);
  }

  deleteAllTasks(): void {
    this.http.delete(`${this.crudURL}/tasks/${1}`);
  }
}
