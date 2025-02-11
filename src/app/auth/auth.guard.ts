import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../stores/user.store';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (
    route,
    state,
    userStore = inject(UserStore),
    router = inject(Router)
) => {
    if (!userStore.user()) {
        await userStore.loadUser();
    }

    if (userStore.isAuthenticated()) {
        return true;
    }

    // route to login page
    router.navigate(['/auth/login']);
    return false;
};
