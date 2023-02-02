import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../model';

@Component({
  selector: 'app-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss'],
})
export class TasksContainerComponent implements OnInit {
  @Input() allTasks$?: Observable<Array<Task>>;

  ngOnInit(): void {}

  emptySet = true;
}
