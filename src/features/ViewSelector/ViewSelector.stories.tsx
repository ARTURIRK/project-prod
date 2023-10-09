import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ViewSelector } from './ViewSelector';

export default {
    title: 'features/ViewSelector',
    component: ViewSelector,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ViewSelector>;

const Template: ComponentStory<typeof ViewSelector> = (args) => <ViewSelector {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
