import { StateSchema } from '@/app/providers/StoreProvider';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { getProfileInfo } from './getProfileInfo';

describe('getProfileInfo.test', () => {
    test('should return state', () => {
        const profileInfo = {
            data: {
                firstName: 'Артаг',
                lastName: 'Цветаев',
                age: 25,
                currency: Currency.RUB,
                country: Country.RUS,
                city: 'Moscow',
                username: 'admin',
            },
            form: {
                firstName: 'Артаг',
                lastName: 'Цветаев',
                age: 25,
                currency: Currency.RUB,
                country: Country.RUS,
                city: 'Moscow',
                username: 'admin',
            },
            isLoading: false,
            readonly: false,
            error: '',
            validateError: [],
        };
        const state: DeepPartial<StateSchema> = {
            profile: profileInfo,
        };
        expect(getProfileInfo(state as StateSchema)).toEqual(profileInfo);
    });
    test('empty', () => {
        const state: DeepPartial<StateSchema> = {

        };
        expect(getProfileInfo(state as StateSchema)).toEqual(undefined);
    });
});
