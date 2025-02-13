import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, lastValueFrom, of, tap } from 'rxjs';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    readonly #baseUrl = environment.apiUrl;
    readonly #http = inject(HttpClient);
    readonly #router = inject(Router);

    async getUser(): Promise<User | null> {
        return await lastValueFrom(
            this.#http.get<User>(`${this.#baseUrl}/auth/me`).pipe(
                tap((user) => {
                    console.log('Current user:', user.name);
                }),
                catchError((error) => {
                    console.error('Failed to get user:', error);
                    return of(null);
                })
            )
        );
    }

    async logout() {
        window.location.href = `${this.#baseUrl}/auth/logout`;
    }
}
