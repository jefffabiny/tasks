import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { FormControl } from '@angular/forms';

import { ApiService } from './api/api';
import { NewTask, Task } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAttemptingAdd$ = new BehaviorSubject(false);
  allTasks$?: Observable<Array<Task>>;
  newTask = new FormControl('');

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.allTasks$ = this.apiService.getTasks();
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
        this.allTasks$ = this.apiService.getTasks();
      },
      error: (err) => console.log(err),
    });
  }
}
