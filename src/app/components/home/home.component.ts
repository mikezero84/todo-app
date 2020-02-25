import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TodoState } from 'app/states/todo-state';
import { Observable, throwError } from 'rxjs';
import { ITaskModel, TaskModelImpl } from 'app/models/task-model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { AddTodoTaskAction } from 'app/actions/todo-actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(TodoState.getAllTasks) public todoTasks$: Observable<ITaskModel[]>
  constructor(private store: Store, private dialog: MatDialog) { }

  ngOnInit() {
  }

  public addTask(): void {
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            id: 0, taskDescription: '', isCompleted: false, action: 1
        };

        const dialogRef = this.dialog.open(TaskDialogComponent,
            dialogConfig);

        dialogRef.afterClosed().subscribe(
            (data) => {
              console.log("Dialog output:", data);

              if (data) {
                this.store.dispatch(new AddTodoTaskAction(new TaskModelImpl({
                  id: 0,
                  taskDescription: data.taskDescription,
                  isCompleted: false,
                  action: data.action
                })))
              }
            },
            (error) => {
              console.log(error);
              throwError(error);
            }
        );
  }
}
