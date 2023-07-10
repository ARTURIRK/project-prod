import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginIsLoading.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                isLoading: true,
            },
        };
        expect(getLoginIsLoading(state as StateSchema)).toEqual(true);
    });
    test('empty', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
            },
        };
        expect(getLoginIsLoading(state as StateSchema)).toEqual(false);
    });
});
