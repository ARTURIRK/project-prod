import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const';
import { NotificationItem } from './NotificationItem';

export default {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    notification: {
        title: 'Уведомление',
        description: 'поесть',
        id: '12',
    },
};

export const Dark = Template.bind({});
Dark.args = {
    notification: {
        title: 'Уведомление',
        description: 'поесть',
        id: '12',
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
