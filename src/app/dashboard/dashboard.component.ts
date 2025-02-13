import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { TodoListStore } from '../stores/todo-list.store';

@Component({
    selector: 'app-dashboard',
    imports: [MatFormFieldModule, ReactiveFormsModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    readonly #todoListStore = inject(TodoListStore);

    todoLists = this.#todoListStore.entities;
}
