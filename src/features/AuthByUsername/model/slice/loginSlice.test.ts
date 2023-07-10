import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

export { loginActions, loginReducer } from './loginSlice';
describe('loginSlice.test', () => {
    test('test set UserName', async () => {
        const state: DeepPartial<LoginSchema> = {
            username: '12345',
        };
        expect(loginReducer(state as LoginSchema, loginActions.setUsername('4321'))).toEqual({ username: '4321' });
    });
    test('test set Password', async () => {
        const state: DeepPartial<LoginSchema> = {
            password: '12345',
        };
        expect(loginReducer(state as LoginSchema, loginActions.setPassword('4321'))).toEqual({ password: '4321' });
    });
});
