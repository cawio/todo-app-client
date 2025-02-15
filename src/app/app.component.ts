import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UserStore } from './stores/user.store';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        DatePipe,
        MatTooltipModule,
        RouterLink,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    readonly #userStore = inject(UserStore);
    readonly #sanitizer = inject(DomSanitizer);

    title = 'Todo App Client';
    authenticated = this.#userStore.isAuthenticated;
    avatar = this.#userStore.avatar;
    discordId = this.#userStore.discordId;
    username = this.#userStore.name;
    createdAt = this.#userStore.createdAt;
    discriminator = this.#userStore.discriminator;
    safeImageUrl = computed(() => {
        const baseCdn = 'https://cdn.discordapp.com';
        if (!this.avatar()) {
            const defaultIndex = parseInt(this.discriminator() ?? '0', 10) % 5;
            return `${baseCdn}/embed/avatars/${defaultIndex}.png`;
        }

        const fileExt = this.avatar()!.startsWith('a_') ? 'gif' : 'png';
        return `${baseCdn}/avatars/${this.discordId()}/${this.avatar()}.${fileExt}?size=${32}`;
    });

    async logout() {
        await this.#userStore.logout();
    }
}
