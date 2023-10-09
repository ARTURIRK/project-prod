import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    getArticlesPageHasMore, getArticlesPageLoading, getArticlesPageNum,
} from '../../selectors/articlesPageSelector';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
    >(
        'articlesPage/fetchNextArticlesPage',
        async (_, thunkApi) => {
            const {
                extra, rejectWithValue, getState, dispatch,
            } = thunkApi;
            const hasMore = getArticlesPageHasMore(getState());
            const page = getArticlesPageNum(getState());
            const isLoading = getArticlesPageLoading(getState());
            if (hasMore && !isLoading) {
                dispatch(articlesPageActions.setPage(page + 1));
                dispatch(fetchArticlesList({
                    page: page + 1,
                }));
            }
        },
    );
