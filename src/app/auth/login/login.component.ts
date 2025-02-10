import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [MatButtonModule, MatIconModule],
    // template for button that login with discord on backend
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    readonly #apiUrl = environment.apiUrl;

    redirect() {
        window.location.href = `${this.#apiUrl}/auth/login`;
    }
}
