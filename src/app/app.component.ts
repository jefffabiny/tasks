import { Component } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  newToDoVal$ = new BehaviorSubject('');
  isAttemptingAdd$ = new BehaviorSubject(false);

  onChange(e: Event) {
    this.newToDoVal$.next((e.target as HTMLInputElement).value);
  }

  handleAddButtonClick() {
    this.isAttemptingAdd$.next(true);
    // this.newToDoVal$.pipe(take(1)).subscribe((val) => {
    //   console.log('here: ', val);
    // });
  }
}
