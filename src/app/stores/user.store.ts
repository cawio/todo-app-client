import { User } from '../../models/User';
import { computed, inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withComputed,
    withHooks,
    withMethods,
    withState,
} from '@ngrx/signals';
import { UserService } from '../services/user.service';

type UserState = {
    isLoading: boolean;
    user: User | null;
};

const initialState: UserState = {
    isLoading: false,
    user: null,
};

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ user }) => ({
        isAuthenticated: computed(() => !!user()),
        id: computed(() => user()?.id),
        discordId: computed(() => user()?.discordId),
        name: computed(() => user()?.name),
        profilePictureId: computed(() => user()?.profilePictureId),
    })),
    withMethods((store, userService = inject(UserService)) => ({
        loadUser: async () => {
            patchState(store, { isLoading: true });
            const user = await userService.getUser();
            patchState(store, { isLoading: false, user });
        },
    }))
);
