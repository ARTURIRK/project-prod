import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: '123',
            },
        };
        expect(getLoginPassword(state as StateSchema)).toBe('123');
    });
    test('empty', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
            },
        };
        expect(getLoginPassword(state as StateSchema)).toEqual('');
    });
});
