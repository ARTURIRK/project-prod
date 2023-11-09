import { AxiosInstance } from 'axios';
import { CombinedState } from 'redux';
import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import type { UserSchema } from 'entities/User';
import type { ProfileSchema } from 'entities/Profile';
import type { ArticleDetailsSchema } from 'entities/Article';
import type { LoginSchema } from 'features/AuthByUsername';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { ScrollSaverSchema } from 'features/ScrollSaver';
import { ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage/model/types';

export interface StateSchema {
    user: UserSchema;
    profile?: ProfileSchema;
    scrollSaver: ScrollSaverSchema;
    // Асинхронные редюсеры
    loginForm?: LoginSchema;
    articleDetails?: ArticleDetailsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema
    articleDetailsPage?:ArticleDetailsPageSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
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
}
export interface ThunkConfig<T> {
    rejectedValue: T,
    extra: ThunkExtraArg;
    state: StateSchema;
}
