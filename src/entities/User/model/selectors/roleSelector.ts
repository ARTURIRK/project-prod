import { createSelector } from 'reselect';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/consts';

export const getRolesSelector = (state: StateSchema) => state.user.authData?.roles;

export const isUserModerator = createSelector(getRolesSelector, (roles) => Boolean(roles?.includes(UserRole.MODERATOR)));
export const isUserAdmin = createSelector(getRolesSelector, (roles) => Boolean(roles?.includes(UserRole.ADMIN)));
