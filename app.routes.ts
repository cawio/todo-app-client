import { Routes } from '@angular/router';
import { LoginComponent } from './src/app/auth/login/login.component';
import { DashboardComponent } from './src/app/dashboard/dashboard.component';
import { authGuard } from './src/app/auth/auth.guard';

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
        // ! This route must be the last one
        path: '**',
        redirectTo: 'dashboard',
    },
];
