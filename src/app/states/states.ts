import { NgxsModule } from '@ngxs/store';
import { LoaderState } from './loader-state';
import { TodoState } from './todo-state';

export const STATES = NgxsModule.forRoot([
    LoaderState,
    TodoState
]);