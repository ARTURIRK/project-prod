import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from 'reselect';
import { UserRole } from '../types/user';

export const getRolesSelector = (state: StateSchema) => state.user.authData?.roles;

export const isUserModerator = createSelector(getRolesSelector, (roles) => Boolean(roles?.includes(UserRole.MODERATOR)));
export const isUserAdmin = createSelector(getRolesSelector, (roles) => Boolean(roles?.includes(UserRole.ADMIN)));
