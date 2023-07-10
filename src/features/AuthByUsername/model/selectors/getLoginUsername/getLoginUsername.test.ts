import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'Bob',
            },
        };
        expect(getLoginUsername(state as StateSchema)).toBe('Bob');
    });
    test('empty', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
            },
        };
        expect(getLoginUsername(state as StateSchema)).toEqual('');
    });
});
