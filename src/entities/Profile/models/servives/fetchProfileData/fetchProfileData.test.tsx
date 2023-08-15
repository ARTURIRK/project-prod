import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';

const data = {
    firstName: 'Артаг',
    lastName: 'Цветаев',
    age: 25,
    currency: 'RUB',
    country: 'Russia',
    city: 'Moscow',
    username: 'admin',
    avatar: 'https://w.forfun.com/fetch/b4/b48a66b3c4ea0107be482a87f1e50fb8.jpeg',
};

describe('fetchProfileData.test', () => {
    test('success ', async () => {
        // @ts-ignore
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk();
        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        // @ts-ignore
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.reject());
        const result = await thunk.callThunk();
        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
