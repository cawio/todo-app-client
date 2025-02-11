import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UserStore } from './stores/user.store';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    readonly #userStore = inject(UserStore);
    readonly #sanitizer = inject(DomSanitizer);

    title = 'Todo App Client';
    authenticated = this.#userStore.isAuthenticated;
    profilePictureId = this.#userStore.profilePictureId;
    discordId = this.#userStore.discordId;
    username = this.#userStore.name;
    safeImageUrl = computed(() =>
        this.#sanitizer.bypassSecurityTrustUrl(
            `https://cdn.discordapp.com/avatars/${this.discordId()}/${this.profilePictureId()}.png?size=32`
        )
    );

    async logout() {}
}
