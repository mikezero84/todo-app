import { LoaderModel } from 'app/models/loader-model';
import { ITaskModel } from 'app/models/task-model';

export class ShowLoader {
    static readonly type = 'SHOW_LOADER';
    constructor(public loader: LoaderModel ) { }
}

export class GetTodoTasksAction {
    static readonly type = 'GET_TODO_TASKS';
}

export class GetTodoTasksSuccessAction {
    static readonly type = 'GET_TODO_TASKS_SUCCESS';
}

export class GetTodoTasksFailAction {
    static readonly type = 'GET_TODO_TASKS_FAIL';
}

export class DeleteTodoTaskAction {
    static readonly type = 'DELETE_TODO_TASK'
    constructor(
        public id: number
    ) {}
}

export class DeleteTodoTaskSuccessAction {
    static readonly type = 'DELETE_TODO_TASKS_SUCCESS';
}

export class DeleteTodoTaskFailAction {
    static readonly type = 'DELETE_TODO_TASKS_FAIL';
}

export class AddTodoTaskAction {
    static readonly type = 'ADD_TODO_TASK'
    constructor(
        public task: ITaskModel
    ) {}
}

export class AddTodoTaskSuccessAction {
    static readonly type = 'ADD_TODO_TASK_SUCCESS';
}

export class AddTodoTaskFailAction {
    static readonly type = 'ADD_TODO_TASK_FAIL';
}

export class EditTodoTaskAction {
    static readonly type = 'EDIT_TODO_TASK'
    constructor(
        public task: ITaskModel
    ) {}
}

export class EditTodoTaskSuccessAction {
    static readonly type = 'EDIT_TODO_TASK_SUCCESS';
}

export class EditTodoTaskFailAction {
    static readonly type = 'EDIT_TODO_TASK_FAIL';
}


