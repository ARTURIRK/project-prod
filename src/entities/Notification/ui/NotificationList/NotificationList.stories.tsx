import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const';
import { NotificationList } from './NotificationList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = () => <NotificationList />;

export const Normal = Template.bind({});
Normal.args = {};

Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    title: 'Уведомление',
                    description: 'Пользователь Х поставил лайк под вашей статьей',
                },
                {
                    id: '3',
                    title: 'Уведомление',
                    description: 'Пользователь Х написал комментарий под вашей статьей',
                },
            ],
        },
    ],
};
Normal.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator({})];
export const Dark = Template.bind({});
Dark.args = {};

Dark.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    title: 'Уведомление',
                    description: 'Пользователь Х поставил лайк под вашей статьей',
                },
                {
                    id: '3',
                    title: 'Уведомление',
                    description: 'Пользователь Х написал комментарий под вашей статьей',
                },
            ],
        },
    ],
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
