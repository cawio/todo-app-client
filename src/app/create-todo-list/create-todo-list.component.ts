import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoListStore } from '../stores/todo-list.store';
import { TodoList } from '../../models/TodoList';
import { UserStore } from '../stores/user.store';
import { Task } from '../../models/Task';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { PriorityPipe } from '../utils/priority.pipe';

@Component({
    selector: 'app-create-todo-list',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatGridListModule,
        MatButtonModule,
        MatDatepickerModule,
        MatSelectModule,
        MatTableModule,
        DatePipe,
        PriorityPipe,
    ],
    templateUrl: './create-todo-list.component.html',
    styleUrl: './create-todo-list.component.scss',
})
export class CreateTodoListComponent {
    readonly #fb = inject(FormBuilder);
    readonly #todoListStore = inject(TodoListStore);
    readonly #userStore = inject(UserStore);

    displayedColumns: string[] = ['title', 'description', 'dueOn', 'priority'];
    userid = this.#userStore.id;
    todoList = signal<TodoList>({
        id: 0,
        userId: this.userid()!,
        title: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tasks: [],
    });
    tasks = computed(() => this.todoList().tasks);
    todoListForm = this.#fb.group({
        title: ['', Validators.required],
    });
    taskForm = this.#fb.group({
        title: ['', Validators.required],
        description: [''],
        dueOn: [''],
        priority: [0],
    });

    addTask(): void {
        this.taskForm.markAllAsTouched();

        if (this.taskForm.invalid) {
            return;
        }

        const { title, description, dueOn, priority } = this.taskForm.value;
        const now = new Date().toISOString();

        // Build the new task object
        const newTask: Task = {
            id: 0,
            title: title?.trim() || '',
            description: description?.trim() || undefined,
            dueOn: dueOn || undefined,
            priority: priority || 0,
            completed: false,
            createdAt: now,
            updatedAt: now,
            tags: [],
        };

        this.todoList.set({
            ...this.todoList(),
            tasks: [...this.tasks(), newTask],
        });

        this.taskForm.reset();
    }

    onSubmit(): void {
        this.todoListForm.markAllAsTouched();

        if (this.todoListForm.invalid) {
            return;
        }

        this.todoList.set({
            ...this.todoList(),
            title: this.todoListForm.value.title?.trim() || '',
        });

        this.#todoListStore.addTodoList(this.todoList());

        this.todoListForm.reset();
    }
}
