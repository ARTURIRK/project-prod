import { Story } from '@storybook/react';
import { Theme } from '../../../const';
// eslint-disable-next-line relative-path-arturts/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
    <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
            <StoryComponent />
        </div>
    </ThemeProvider>
);
