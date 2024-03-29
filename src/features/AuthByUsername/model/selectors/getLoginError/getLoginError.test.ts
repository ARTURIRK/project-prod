import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginError } from './getLoginError';

describe('getLoginError.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                error: 'error',
            },
        };
        expect(getLoginError(state as StateSchema)).toEqual('error');
    });
    test('empty', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {},
        };
        expect(getLoginError(state as StateSchema)).toEqual(undefined);
    });
});
