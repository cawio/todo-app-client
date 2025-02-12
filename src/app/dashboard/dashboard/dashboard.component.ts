import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export type TodoList = {
    id: number;
    userId: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    tasks: Task[];
};

export type Task = {
    id: number;
    title: string;
    description: string;
    dueOn: string;
    priority: number;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
};

export type Tag = {
    id: number;
    name: string;
};

@Component({
    selector: 'app-dashboard',
    imports: [MatFormFieldModule, ReactiveFormsModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    readonly #http = inject(HttpClient);

    todoLists: TodoList[] = [];

    async ngOnInit() {
        this.todoLists = await lastValueFrom(
            this.#http.get<TodoList[]>(environment.apiUrl + '/todo-lists', {
                withCredentials: true,
            })
        );
    }
}
