import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { Profile } from 'entities/Profile';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';
import { validateProfileData } from './validateProfileData';

const data: Profile = {
    firstName: 'Артаг',
    lastName: 'Цветаев',
    age: 25,
    currency: Currency.RUB,
    country: Country.BEL,
    city: 'Moscow',
    username: 'admin',
    avatar: 'https://w.forfun.com/fetch/b4/b48a66b3c4ea0107be482a87f1e50fb8.jpeg',
};

describe('fetchProfileData.test', () => {
    test('success', async () => {
        const result = validateProfileData(data);
        expect(result).toEqual([]);
    });

    test('without first and last name', async () => {
        const result = validateProfileData({
            age: 25,
            currency: Currency.RUB,
            country: Country.BEL,
            city: 'Moscow',
            username: 'admin',
            avatar: 'https://w.forfun.com/fetch/b4/b48a66b3c4ea0107be482a87f1e50fb8.jpeg',
        });
        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });
    test('without age', async () => {
        const result = validateProfileData({
            firstName: 'Артаг',
            lastName: 'Цветаев',
            currency: Currency.RUB,
            country: Country.BEL,
            city: 'Moscow',
            username: 'admin',
            avatar: 'https://w.forfun.com/fetch/b4/b48a66b3c4ea0107be482a87f1e50fb8.jpeg',
        });
        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });
    test('without country', async () => {
        const result = validateProfileData({
            age: 25,
            firstName: 'Артаг',
            lastName: 'Цветаев',
            currency: Currency.RUB,
            city: 'Moscow',
            username: 'admin',
            avatar: 'https://w.forfun.com/fetch/b4/b48a66b3c4ea0107be482a87f1e50fb8.jpeg',
        });
        expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
    });
    test('without profile', async () => {
        const result = validateProfileData();
        expect(result).toEqual([ValidateProfileError.NO_DATA]);
    });
    test('without profile', async () => {
        const result = validateProfileData({});
        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });
});
