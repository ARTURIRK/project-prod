import { rtkApi } from '@/shared/api/rtkApi';
import type { Notification } from '../models/types/notifications';

const notificationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
    overrideExisting: false,
});
export const useNotifications = notificationsApi.useGetNotificationsQuery;
