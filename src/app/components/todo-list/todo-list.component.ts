import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { throwError } from 'rxjs';
import { ITaskModel, TaskModelImpl } from 'app/models/task-model';
import { DeleteTodoTaskAction, EditTodoTaskAction } from 'app/actions/todo-actions';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TodoService } from 'app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public isUserAdmin: boolean = false;

  @Input() todoTasks: ITaskModel[];
  constructor(private store: Store, private dialog: MatDialog, private todoService: TodoService) {
    const subs = this.todoService.isUserAdmin().subscribe(
      (data) => {
        if (subs) {
          subs.unsubscribe();
        }

        this.isUserAdmin = data;
      }
    );
  }

  ngOnInit() {
  }

  public deleteTask(id: number): void {
    this.store.dispatch(new DeleteTodoTaskAction(id))
  }

  public editTask(id: number): void {
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const editTodoTask = this.todoTasks.find((todoTask) => todoTask.id === id);

        dialogConfig.data = {
            id: id, taskDescription: editTodoTask.taskDescription, isCompleted: false, action: 2
        };

        const dialogRef = this.dialog.open(TaskDialogComponent,
            dialogConfig);

        dialogRef.afterClosed().subscribe(
            (data) => {
              console.log("Dialog output:", data);

              if (data) {
                this.store.dispatch(new EditTodoTaskAction(new TaskModelImpl({
                  id: id,
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
