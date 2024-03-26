import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Theme } from '@/shared/const';
import { ThemeContext } from '@/shared/lib/contexts';
import { useJsonSettings } from '@/entities/User';

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

export default function ThemeProvider({
    initialTheme,
    children,
}: ThemeProviderProps) {
    const { theme: defaultTheme } = useJsonSettings();
    const [theme, setTheme] = useState<Theme>(
        initialTheme || defaultTheme || Theme.LIGHT,
    );
    const [isThemeInited, setIsThemeInited] = useState(false);
    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );
    useEffect(() => {
        if (!isThemeInited && defaultTheme) {
            setTheme(defaultTheme);
            setIsThemeInited(true);
        }
    }, [isThemeInited, defaultTheme]);

    useEffect(() => {
        document.body.className = theme; // нужно для изменения стилей скролла
    }, [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
}
