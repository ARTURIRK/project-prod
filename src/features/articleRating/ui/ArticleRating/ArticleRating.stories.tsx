import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import ArticleRating from './ArticleRating';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (props) => <ArticleRating {...props} />;

export const Default = Template.bind({});
Default.args = {
    articleId: '1',

};
Default.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator({
    user: {
        authData: { id: '1' },
    },
})];
Default.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [

            ],
        },
    ],
};
export const Rated = Template.bind({});
Rated.args = {
    articleId: '1',

};
Rated.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator({
    user: {
        authData: { id: '1' },
    },
})];
Rated.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [
                { rate: 4 },

            ],
        },
    ],
};
export const Dark = Template.bind({});
Dark.args = {
    articleId: '1',

};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    user: {
        authData: { id: '1' },
    },
})];
