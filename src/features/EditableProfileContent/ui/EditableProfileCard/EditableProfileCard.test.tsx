import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Profile } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { $api } from '@/shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
    id: '1',
    firstName: 'Артаг',
    lastName: 'Цветаевич',
    age: 12,
    currency: Currency.EUR,
    country: Country.RUS,
    city: 'Moscow',
    username: 'КРУТОЙ',
    avatar: 'https://w.forfun.com/fetch/b4/b48a66b3c4ea0107be482a87f1e50fb8.jpeg',
};
const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: { id: '1', username: 'admin' },
        },
    },
    asyncReducers: { profile: profileReducer },
};
describe('EditableProfileCard', () => {
    test('Edit click test', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.Edit'),
        );
        expect(
            screen.getByTestId('EditableProfileCardHeader.Cancel'),
        ).toBeInTheDocument();
    });

    test('check cancel action', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.Edit'),
        );
        await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'));
        await userEvent.type(
            screen.getByTestId('ProfileCard.FirstName'),
            'Artur',
        );
        expect(screen.getByTestId('ProfileCard.FirstName')).toHaveValue(
            'Artur',
        );
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.Cancel'),
        );
        expect(screen.getByTestId('ProfileCard.FirstName')).toHaveValue(
            'Артаг',
        );
    });
    test('check error text', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.Edit'),
        );
        await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'));
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.Save'),
        );
        expect(
            screen.getByTestId('EditableProfileCard.Error.Paragraph'),
        ).toBeInTheDocument();
        expect(
            screen.getByTestId('EditableProfileCard.Error.Paragraph'),
        ).toHaveTextContent('Не указаны имя или фамилия');
    });
    test('check put  request', async () => {
        const mockPutReq = jest.spyOn($api, 'put');
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.Edit'),
        );
        await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'));
        await userEvent.type(
            screen.getByTestId('ProfileCard.FirstName'),
            'Arturio',
        );
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.Save'),
        );
        expect(mockPutReq).toHaveBeenCalled();
    });
});
