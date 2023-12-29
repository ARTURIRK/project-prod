import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getUserAuthData } from 'entities/User';

export const getCanEditArticle = createSelector((state: StateSchema) => state.articleDetails?.data, getUserAuthData, (article, user) => {
    if (!article && !user) {
        return false;
    }
    return article?.user.id === user?.id;
});
