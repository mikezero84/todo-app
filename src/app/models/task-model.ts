export interface ITaskModel {
    id: number;
    taskDescription: string;
    isCompleted: boolean;
    action?: number;
}

export class TaskModelImpl implements ITaskModel {
    id: number;
    taskDescription: string;
    isCompleted: boolean;
    action?: number;

    constructor(item) {
        this.id = item.id;
        this.taskDescription = item.taskDescription;
        this.isCompleted = item.isCompleted;
        this.action = item.action;
    }
}
