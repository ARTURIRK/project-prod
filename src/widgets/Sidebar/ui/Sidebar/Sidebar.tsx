import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { LangSwitcher } from '@/features/LangSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { VStack } from '@/shared/ui/Stack';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSelector(getSidebarItems);
    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <aside
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>
            <VStack role="navigation" gap="16" className={cls.items}>
                {
                    sidebarItemsList.map((el) => (
                        <SidebarItem
                            key={el.path}
                            item={el}
                            collapsed={collapsed}
                        />
                    ))
                }
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher
                    short={collapsed}
                    className={cls.lang}
                />
            </div>
        </aside>
    );
});
