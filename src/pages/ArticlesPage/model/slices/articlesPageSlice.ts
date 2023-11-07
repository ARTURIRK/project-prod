import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import {
    Article, ArticleView, ArticleSortField, ArticleType,
} from 'entities/Article';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { SortOrder } from 'shared/types';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../types/articlesPageSchema';

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);
export const articlePageSlice = createSlice({
    name: 'articleDetailsCommentsSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        view: ArticleView.SMALL,
        ids: [],
        entities: {},
        page: 1,
        hasMore: true,
        inited: false,
        search: '',
        limit: 9,
        sort: ArticleSortField.CREATED,
        order: 'asc',
        type: ArticleType.ALL,
    }),

    reducers: {
        setView: (state, { payload }: PayloadAction<ArticleView>) => {
            state.view = payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, payload);
        },
        setPage: (state, { payload }: PayloadAction<number>) => {
            state.page = payload;
        },
        setOrder: (state, { payload }: PayloadAction<SortOrder>) => {
            state.order = payload;
        },
        setSearch: (state, { payload }: PayloadAction<string>) => {
            state.search = payload;
        },
        setSort: (state, { payload }: PayloadAction<ArticleSortField>) => {
            state.sort = payload;
        },
        setType: (state, { payload }: PayloadAction<ArticleType>) => {
            state.type = payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView || ArticleView.SMALL;
            state.view = view;
            state.limit = view === ArticleView.BIG ? 4 : 9;
            state.inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticlesList.fulfilled, (
                state,
                action,
            ) => {
                state.isLoading = false;

                state.hasMore = action.payload.length >= state.limit;
                if (action.meta.arg.replace) {
                    articlesAdapter.addMany(state, action.payload);
                } else {
                    articlesAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },

});

export const {
    reducer: articlesPageReducer,
    actions: articlesPageActions,
} = articlePageSlice;
