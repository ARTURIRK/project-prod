import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Profile } from '@/entities/Profile';
import { fetchProfileData } from '../servives/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../servives/updateProfileData/updateProfileData';
import type { ProfileSchema } from '../types/editableProfileCardSchema';
import { ValidateProfileError } from '../consts/consts';

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
    form: undefined,
    validateError: [],
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (
            state: ProfileSchema,
            { payload }: PayloadAction<boolean>,
        ) => {
            state.readonly = payload;
        },
        updateProfile: (
            state: ProfileSchema,
            { payload }: PayloadAction<Profile>,
        ) => {
            state.form = {
                ...state.form,
                ...payload,
            };
        },
        cancelEdit: (state: ProfileSchema) => {
            state.readonly = true;
            state.form = state.data;
            state.validateError = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.validateError = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchProfileData.fulfilled,
                (state, { payload }: PayloadAction<Profile>) => {
                    state.isLoading = false;
                    state.data = payload;
                    state.form = payload;
                },
            )
            .addCase(fetchProfileData.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.validateError = payload as ValidateProfileError[];
            })
            .addCase(updateProfileData.pending, (state) => {
                state.validateError = undefined;
                state.isLoading = true;
            })
            .addCase(
                updateProfileData.fulfilled,
                (state, { payload }: PayloadAction<Profile>) => {
                    state.isLoading = false;
                    state.data = payload;
                    state.form = payload;
                    state.readonly = true;
                },
            )
            .addCase(updateProfileData.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.validateError = payload as ValidateProfileError[];
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
