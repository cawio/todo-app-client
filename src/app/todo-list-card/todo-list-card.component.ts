import { Component, computed, input } from '@angular/core';
import { TodoList } from '../../models/TodoList';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { PriorityPipe } from '../utils/priority.pipe';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-todo-list-card',
    imports: [
        MatCardModule,
        MatChipsModule,
        MatCheckboxModule,
        MatTableModule,
        DatePipe,
        PriorityPipe,
    ],
    templateUrl: './todo-list-card.component.html',
    styleUrl: './todo-list-card.component.scss',
})
export class TodoListCardComponent {
    todoList = input.required<TodoList>();
    tags = computed<string[]>(() =>
        this.todoList()
            .tasks.map((task) => task.tags.map((tag) => tag.name))
            .flat()
    );
    displayedColumns: string[] = [
        'completed',
        'title',
        'description',
        'dueOn',
        'priority',
    ];
}
