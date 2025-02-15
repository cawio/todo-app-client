import { Component, inject } from '@angular/core';
import { TodoListStore } from '../stores/todo-list.store';
import { TodoListCardComponent } from '../todo-list-card/todo-list-card.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-dashboard',
    imports: [
        TodoListCardComponent,
        MatButtonModule,
        RouterLink,
        MatIconModule,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    readonly #todoListStore = inject(TodoListStore);

    todoLists = this.#todoListStore.entities;
}
