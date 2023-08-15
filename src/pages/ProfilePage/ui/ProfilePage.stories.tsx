import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import avatar from 'shared/assets/tests/avatar.jpeg';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator({
    profile: {
        form: {

            firstName: 'Артаг',
            lastName: 'Цветаев',
            age: 25,
            currency: Currency.RUB,
            country: Country.RUS,
            city: 'Moscow',
            username: 'admin',
            avatar,
        },
    },
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    profile: {
        form: {

            firstName: 'Артаг',
            lastName: 'Цветаев',
            age: 25,
            currency: Currency.RUB,
            country: Country.RUS,
            city: 'Moscow',
            username: 'admin',
            avatar,
        },
    },
})];
