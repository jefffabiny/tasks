import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { ApiService } from './api/api';
import { Task } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  newToDoVal$ = new BehaviorSubject('');
  isAttemptingAdd$ = new BehaviorSubject(false);
  allTasks$?: Observable<Array<Task>>;

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.allTasks$ = this.apiService.getTasks();
  }

  onChange(e: Event) {
    this.newToDoVal$.next((e.target as HTMLInputElement).value);
  }

  handleAddButtonClick() {
    this.isAttemptingAdd$.next(true);
    this.newToDoVal$.pipe(take(1)).subscribe((val) => {
      let newTask = { task: val, isDone: false };
      this.apiService.addTask(newTask).subscribe({
        next: (response) => {
          this.isAttemptingAdd$.next(false);
        },
        error: (err) => console.log(err),
      });
    });
  }
}
