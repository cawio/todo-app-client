import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { CreateTodoListComponent } from './create-todo-list/create-todo-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        title: 'Dashboard',
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
    },
    {
        path: 'auth',
        children: [
            {
                title: 'Login',
                path: 'login',
                component: LoginComponent,
            },
        ],
    },
    {
        title: 'Create Todo List',
        path: 'create',
        component: CreateTodoListComponent,
        canActivate: [authGuard],
    },
    {
        // ! This route must be the last one
        path: '**',
        redirectTo: 'dashboard',
    },
];
