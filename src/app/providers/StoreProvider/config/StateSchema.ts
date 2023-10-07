import { NavigateOptions, To } from 'react-router-dom';
import { AxiosInstance } from 'axios';
import { CombinedState } from 'redux';
import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import type { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
import type { UserSchema } from 'entities/User';
import type { ProfileSchema } from 'entities/Profile';
import type { ArticleDetailsSchema } from 'entities/Article';
import type { LoginSchema } from 'features/AuthByUsername';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { ArticlesPageSchema } from 'pages/ArticlesPage';

export interface StateSchema {
    user: UserSchema;
    profile?: ProfileSchema;
    // Асинхронные редюсеры
    loginForm?: LoginSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleDetailsCommentsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}
export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}
export interface ThunkConfig<T> {
    rejectedValue: T,
    extra: ThunkExtraArg;
    state: StateSchema;
}
