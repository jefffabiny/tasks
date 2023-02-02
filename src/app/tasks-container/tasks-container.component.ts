import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

import { Task } from '../model';

@Component({
  selector: 'app-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss'],
})
export class TasksContainerComponent {
  constructor() {}
  @Input() allTasks$?: Observable<Array<Task>>;
  @Output() deleteEvent = new EventEmitter<string>();

  handleDelete(id: string) {
    this.deleteEvent.emit(id);
  }
}
