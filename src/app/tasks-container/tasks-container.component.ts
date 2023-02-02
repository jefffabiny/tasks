import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model';
import { ApiService } from '../api/api';

@Component({
  selector: 'app-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss'],
})
export class TasksContainerComponent {
  constructor(private apiService: ApiService) {}
  @Input() allTasks$?: Observable<Array<Task>>;

  handleDelete(id: string) {
    this.apiService.deleteTask(id).subscribe({
      next: () => (this.allTasks$ = this.apiService.getTasks()),
      error: (err) => console.log(err),
    });
  }
}
