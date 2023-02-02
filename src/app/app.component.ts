import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  startWith,
  Subject,
  switchMap,
  take,
} from 'rxjs';
import { FormControl } from '@angular/forms';

import { ApiService } from './api/api';
import { NewTask, Task } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly refreshSubject = new Subject<void>();
  isAttemptingAdd$ = new BehaviorSubject(false);
  allTasks$?: Observable<Array<Task>>;
  newTask = new FormControl('');

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.allTasks$ = this.refreshSubject.pipe(
      startWith(undefined),
      switchMap(() => this.apiService.getTasks())
    );
  }

  handleAddButtonClick() {
    this.isAttemptingAdd$.next(true);
    let taskObj: NewTask = {
      task: this.newTask.value as string,
      isDone: false,
    };
    this.apiService.addTask(taskObj).subscribe({
      next: () => {
        this.isAttemptingAdd$.next(false);
        this.newTask.reset();
        this.refreshSubject.next();
      },
      error: (err) => console.log(err),
    });
  }

  deleteTask(id: string) {
    this.apiService.deleteTask(id).subscribe({
      next: () => {
        this.refreshSubject.next();
      },
    });
  }
}
