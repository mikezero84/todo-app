import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ITaskModel, TaskModelImpl } from 'app/models/task-model';
import { 
    GetTodoTasksAction, 
    GetTodoTasksSuccessAction, 
    GetTodoTasksFailAction, 
    DeleteTodoTaskAction, 
    DeleteTodoTaskSuccessAction, 
    AddTodoTaskAction,
    AddTodoTaskSuccessAction,
    EditTodoTaskAction,
    EditTodoTaskSuccessAction,
    ShowLoader
} from 'app/actions/todo-actions';
import { TodoService } from 'app/services/todo.service';
import { map, catchError, concat, tap } from 'rxjs/internal/operators';
import { throwError } from 'rxjs';

export interface TodoStateModel {
    tasks: ITaskModel[];
}

@State<TodoStateModel>({
    name: 'todo',
    defaults: {
        tasks: []
    }
})
export class TodoState {
    constructor(
        private store: Store,
        private todoService: TodoService) {}

    @Selector()
    static getAllTasks(state: TodoStateModel) {
        return state.tasks;
    }

    @Action(GetTodoTasksAction)
    GetTodoTasksAction(stateContext: StateContext<TodoStateModel>) {
        const state = stateContext.getState();
        return this.todoService.getTodoTasks()
            .pipe(
                map((todoTasks) => {
                    let tasks = [];
                    todoTasks.forEach((todoTask) => {
                        tasks.push(new TaskModelImpl({
                            id: todoTask.id,
                            taskDescription: todoTask.taskDescription,
                            isCompleted: todoTask.isCompleted
                        }));
                    });

                    stateContext.setState({
                        ...state,
                        tasks: tasks
                    });
                    this.store.dispatch(new ShowLoader({show: false}));
                    stateContext.dispatch(new GetTodoTasksSuccessAction);
                }),
                catchError((errors: any) => {
                    this.store.dispatch(new ShowLoader({show: false}));
                    stateContext.dispatch(new GetTodoTasksFailAction);
                    return throwError(errors);
                })
            );
    }

    @Action(DeleteTodoTaskAction)
    DeleteTodoTaskAction(stateContext: StateContext<TodoStateModel>, action: DeleteTodoTaskAction) {
        const state = stateContext.getState();
        const taskID = action.id

        let tasks: ITaskModel[] = state.tasks.filter((task) => task.id !== taskID);
        console.log('removed task', tasks);

        stateContext.setState({
            ...state,
            tasks: tasks
        });
        stateContext.dispatch(new DeleteTodoTaskSuccessAction);

        return tasks;
    }

    @Action(AddTodoTaskAction)
    AddTodoTaskAction(stateContext: StateContext<TodoStateModel>, action: AddTodoTaskAction) {
        const state = stateContext.getState();
        const taskID = this.getLastID() + 1;
        
        let tasks: ITaskModel[] = state.tasks;

        tasks.push(new TaskModelImpl({
            id: taskID,
            taskDescription: action.task.taskDescription,
            isCompleted: action.task.isCompleted
        }))

        stateContext.setState({
            ...state,
            tasks: tasks
        });
        stateContext.dispatch(new AddTodoTaskSuccessAction);
    }

    @Action(EditTodoTaskAction)
    EditTodoTaskAction(stateContext: StateContext<TodoStateModel>, action: EditTodoTaskAction) {
        const state = stateContext.getState();
        let tasks: ITaskModel[] = state.tasks;

        tasks.map((task) => {
            if (task.id === action.task.id) {
                task.taskDescription = action.task.taskDescription;
            }
        });

        stateContext.setState({
            ...state,
            tasks: tasks
        });
        stateContext.dispatch(new EditTodoTaskSuccessAction);
    }

    private getLastID(): number {
        const tasks = this.store.selectSnapshot<ITaskModel[]>((state) => state.todo.tasks);
        return Math.max(...tasks.map(task => task.id));
    }
}
