import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { fetchProfileData } from '../servives/fetchProfileData/fetchProfileData';
import type { ProfileSchema } from '../types/editableProfileCardSchema';
import { ValidateProfileError } from '../consts/consts';
import { profileActions, profileReducer } from './profileSlice';

const data = {
    id: '1',
    firstName: 'Артаг',
    lastName: 'Цветаев',
    age: 25,
    currency: Currency.RUB,
    country: Country.BEL,
    city: 'Moscow',
    username: 'admin',
    avatar: 'https://w.forfun.com/fetch/b4/b48a66b3c4ea0107be482a87f1e50fb8.jpeg',
};
describe('profileSlice.test', () => {
    test('test setReadonly', async () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
        };
        expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({ readonly: true });
    });
    test('test updateProfile', async () => {
        const state: DeepPartial<ProfileSchema> = {
            form: {
                ...data,
            },
        };
        expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({ ...data, lastName: 'Smith' }))).toEqual({
            form: {
                ...data,
                lastName: 'Smith',
            },
        });
    });
    test('test cancelEdit', async () => {
        const state: DeepPartial<ProfileSchema> = {
            form: {
                ...data,
                age: 12,
            },
            data,
            readonly: false,
            validateError: [],
        };
        expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit())).toEqual({
            form: {
                ...data,
            },
            data,
            readonly: true,
            validateError: undefined,
        });
    });
    test('test service fetchProfileData pending', async () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateError: [ValidateProfileError.SERVER_ERROR],
        };
        expect(profileReducer(state as ProfileSchema, fetchProfileData.pending)).toEqual({
            isLoading: true,
            validateError: undefined,
        });
    });
    test('test service fetchProfileData fulfilled', async () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
            validateError: undefined,
        };
        expect(profileReducer(state as ProfileSchema, fetchProfileData.fulfilled(data, '', ''))).toEqual({
            isLoading: false,
            data,
            form: data,
        });
    });
});
