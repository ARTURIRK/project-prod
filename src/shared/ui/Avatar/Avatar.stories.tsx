import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar } from './Avatar';
import avatarImage from './avatar.jpeg';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    src: avatarImage,
    size: 150,
    alt: 'Primary',
};

export const Small = Template.bind({});
Small.args = {
    src: avatarImage,
    size: 50,
    alt: 'Small',
};
