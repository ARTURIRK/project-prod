import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Button,
    ButtonTheme,
} from '../../../shared/ui/deprecated/Button/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-dark.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    function onToggleHandle() {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Icon
                    Svg={ThemeIcon}
                    clickable
                    onClick={onToggleHandle}
                />
            }
            off={
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={classNames('', {}, [className])}
                    onClick={onToggleHandle}
                >
                    <IconDeprecated
                        Svg={ThemeIconDeprecated}
                        width={40}
                        height={40}
                        inverted
                    />
                </Button>
            }
        />
    );
});
