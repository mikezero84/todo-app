import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule, MatButtonModule, MatListModule, MatIconModule, MatDialogModule, MatInputModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
//import { ComponentsModule } from './components/components.module';
import { STATES } from './states/states';

import { AppRoutingModule } from './app-routing.module';
import { TodoService } from './services/todo.service';

import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';


export const MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule
];
@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HomeComponent,
    TodoListComponent,
    TaskDialogComponent
  ],
  imports: [
    MODULES,
    STATES,
    BrowserModule,
    AppRoutingModule,
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: false}),

  ],
  providers: [
    TodoService
  ],
  entryComponents: [
    TaskDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
