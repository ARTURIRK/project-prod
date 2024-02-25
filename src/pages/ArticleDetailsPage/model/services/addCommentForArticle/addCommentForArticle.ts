import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IComment } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    IComment,
    string,
    ThunkConfig<string>
>('articleDetails/addCommentForArticle', async (text, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;
    const userData = getUserAuthData(getState());
    const articleData = getState().articleDetails?.data;
    if (!userData || !text || !articleData) {
        return rejectWithValue('no-data');
    }
    try {
        const response = await extra.api.post<IComment>('/comments', {
            articleId: articleData.id,
            userId: userData.id,
            text,
        });

        if (!response.data) {
            throw new Error();
        }
        dispatch(fetchCommentsByArticleId(articleData.id));
        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
