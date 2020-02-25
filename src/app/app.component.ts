import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import {
  ShowLoader, GetTodoTasksAction
} from './actions/todo-actions';
import { LoaderState } from './states/loader-state';
import { LoaderModel } from './models/loader-model';
import { filter } from 'rxjs/internal/operators';
import { TodoService } from './services/todo.service';
declare var $: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showLoadingAnimation: Subject<boolean> = new BehaviorSubject(false);
  private loader$: Observable<boolean>;
  //@Select(LoaderState.getLoader) public getLoader$: Observable<boolean>;
  title = 'todo-app';

  constructor(private store: Store, private changeDetector: ChangeDetectorRef, private todoService: TodoService) {
    this.loader$ = this.store.select(state => state);
  }

  ngOnInit() {
    this.getTasks();
    this.loader$
            .pipe(filter((state: any) => state.loader !== undefined && state.loader !== null ))
            .subscribe((state: any) => {
                if (state.loader.show) {
                    window.scroll(0, 0);
                    $('html').css({'overflow': 'hidden'});
                } else {
                    $('html').css({'overflow': 'visible'});
                }
                this.showLoadingAnimation.next(state.loader.show);
            })

  }

  public getTasks(): void {
    this.store.dispatch(new ShowLoader({show: true}));
    const tasksSubscription = this.store.dispatch(new GetTodoTasksAction())
      .subscribe(
        () => {
          if (tasksSubscription) {
            tasksSubscription.unsubscribe();
          }
        })
  }
}
