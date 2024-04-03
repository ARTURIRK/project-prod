import { useTheme } from '@/shared/lib/hooks/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

export const ThemeSwitcher = () => {
    const { toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    function onToggleHandle() {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }
    return (
        <Icon
            Svg={ThemeIcon}
            clickable
            onClick={onToggleHandle}
        />
    );
};
