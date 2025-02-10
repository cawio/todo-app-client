import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {
        title: 'Todo - Login',
        component: LoginComponent,
        path: 'login',
    },
];
