import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { CommentList } from './CommentList';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    comments: [
        {
            id: '1',
            text: 'hello world',
            user: { id: '1', username: 'Artur', avatar: 'https://w.forfun.com/fetch/b4/b48a66b3c4ea0107be482a87f1e50fb8.jpeg' },
        },
        {
            id: '2',
            text: 'hello world!!!',
            user: { id: '1', username: 'Artur', avatar: 'https://w.forfun.com/fetch/b4/b48a66b3c4ea0107be482a87f1e50fb8.jpeg' },
        },
    ],
};
export const Loading = Template.bind({});
Loading.args = {
    comments: [
        {
            id: '1',
            text: 'hello world',
            user: { id: '1', username: 'Artur', avatar: 'https://w.forfun.com/fetch/b4/b48a66b3c4ea0107be482a87f1e50fb8.jpeg' },
        },
        {
            id: '2',
            text: 'hello world!!!',
            user: { id: '1', username: 'Artur', avatar: 'https://w.forfun.com/fetch/b4/b48a66b3c4ea0107be482a87f1e50fb8.jpeg' },
        },
    ],
    isLoading: true,
};

export const Dark = Template.bind({});
Dark.args = {
    comments: [
        {
            id: '1',
            text: 'hello world',
            user: { id: '1', username: 'Artur', avatar: 'https://w.forfun.com/fetch/b4/b48a66b3c4ea0107be482a87f1e50fb8.jpeg' },
        },
        {
            id: '2',
            text: 'hello world!!!',
            user: { id: '1', username: 'Artur', avatar: 'https://w.forfun.com/fetch/b4/b48a66b3c4ea0107be482a87f1e50fb8.jpeg' },
        },
    ],
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
