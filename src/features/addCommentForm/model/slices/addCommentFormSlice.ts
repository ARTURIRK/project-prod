import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
    text: '',
    error: '',
};

export const AddCommentFormSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText: (state, { payload }: PayloadAction<string>) => {
            state.text = payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByUsername.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(loginByUsername.fulfilled, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(loginByUsername.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload as string;
    //         });
    // },
});

export const { actions: addCommentFormActions } = AddCommentFormSlice;
export const { reducer: addCommentFormReducer } = AddCommentFormSlice;
