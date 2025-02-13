import {
    patchState,
    signalStore,
    withComputed,
    withHooks,
    withMethods,
    withState,
} from '@ngrx/signals';
import { TodoList } from '../dashboard/dashboard.component';
import {
    addEntities,
    addEntity,
    removeEntity,
    withEntities,
} from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import { TodoListService } from '../services/todo-list.service';

type TodoListState = {
    isLoading: boolean;
};

const initialState: TodoListState = {
    isLoading: false,
};

export const TodoListStore = signalStore(
    { providedIn: 'root' },

    withState(initialState),

    withEntities<TodoList>(),

    withComputed(() => ({})),

    withMethods((store, todoListService = inject(TodoListService)) => ({
        loadTodoLists: async () => {
            patchState(store, { isLoading: true });
            const todoList = await todoListService.getTodoLists();
            patchState(store, addEntities(todoList));
            patchState(store, { isLoading: false });
        },

        addTodoList: async (todoList: TodoList) => {
            const newTodoList = await todoListService.createTodoList(todoList);
            if (!newTodoList) {
                return;
            }
            patchState(store, addEntity(newTodoList));
        },

        updateTodoList: async (todoList: TodoList) => {
            const updatedTodoList = await todoListService.updateTodoList(
                todoList
            );
            if (!updatedTodoList) {
                return;
            }
            patchState(store, addEntity(updatedTodoList));
        },

        deleteTodoList: async (todoList: TodoList) => {
            const success = await todoListService.deleteTodoList(todoList.id);

            if (!success) {
                return;
            }

            patchState(store, removeEntity(todoList.id));
        },
    })),

    withHooks({
        onInit(store) {
            store.loadTodoLists();
        },
    })
);
