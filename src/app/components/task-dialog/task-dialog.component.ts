import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITaskModel } from 'app/models/task-model';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  form: FormGroup;
  taskDescription:string;
  action: number;
  id: number;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<TaskDialogComponent>,
        @Inject(MAT_DIALOG_DATA) {id, taskDescription, isCompleted, action}: ITaskModel) {

        this.id = id;
        this.taskDescription = taskDescription;
        this.action = action;

        this.form = fb.group({
          id: [id],
          taskDescription: [taskDescription, Validators.required],
          action: [action]
        });
    }

    ngOnInit() {

    }


    save(action: number) {
        if (this.form.valid) {
          this.dialogRef.close(this.form.value);
        }
    }

    close() {
        this.dialogRef.close();
    }

}
