import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, lastValueFrom, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { TodoList } from '../../models/TodoList';

@Injectable({
    providedIn: 'root',
})
export class TodoListService {
    readonly #http = inject(HttpClient);
    readonly #apiBaseUrl = environment.apiUrl;

    async getTodoLists(): Promise<TodoList[]> {
        return await lastValueFrom(
            this.#http.get<TodoList[]>(`${this.#apiBaseUrl}/todo-lists`).pipe(
                tap((todoLists) => {
                    console.log(`Fetched ${todoLists.length} todo lists`);
                }),
                catchError((error) => {
                    console.error('Failed to fetch todo lists:', error);
                    return of([]);
                })
            )
        );
    }

    getTodoList(id: number): Promise<TodoList | null> {
        return lastValueFrom(
            this.#http
                .get<TodoList>(`${this.#apiBaseUrl}/todo-lists/${id}`)
                .pipe(
                    tap((todoList) => {
                        console.log('Fetched todo list:', todoList.title);
                    }),
                    catchError((error) => {
                        console.error('Failed to fetch todo list:', error);
                        return of(null);
                    })
                )
        );
    }

    async createTodoList(todoList: TodoList): Promise<TodoList | null> {
        if (todoList.id !== 0) {
            console.error('Invalid todo list:', todoList);
            return null;
        }

        return await lastValueFrom(
            this.#http
                .post<TodoList>(`${this.#apiBaseUrl}/todo-lists`, todoList)
                .pipe(
                    tap((todoList) => {
                        console.log('Created todo list:', todoList.title);
                    }),
                    catchError((error) => {
                        console.error('Failed to create todo list:', error);
                        return of(null);
                    })
                )
        );
    }

    async updateTodoList(todoList: TodoList): Promise<TodoList | null> {
        if (todoList.id === 0) {
            console.error('Invalid todo list:', todoList);
            return null;
        }

        return await lastValueFrom(
            this.#http
                .put<TodoList>(
                    `${this.#apiBaseUrl}/todo-lists/${todoList.id}`,
                    todoList
                )
                .pipe(
                    tap((todoList) => {
                        console.log('Updated todo list:', todoList.title);
                    }),
                    catchError((error) => {
                        console.error('Failed to update todo list:', error);
                        return of(null);
                    })
                )
        );
    }

    async deleteTodoList(id: number): Promise<boolean> {
        return await lastValueFrom(
            this.#http
                .delete<TodoList>(`${this.#apiBaseUrl}/todo-lists/${id}`)
                .pipe(
                    map(() => {
                        console.log('Deleted todo list:', id);
                        return true;
                    }),
                    catchError((error) => {
                        console.error('Failed to delete todo list:', error);
                        return of(false);
                    })
                )
        );
    }
}
