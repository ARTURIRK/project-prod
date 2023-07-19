import { getUserAuthData } from 'entities/User';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { SidebarItemType } from 'widgets/Sidebar/model/items';
import cls from './SidebarItem.module.scss';

interface Props {
 item: SidebarItemType;
 collapsed?: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: Props) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);
    return (
        (item.authOnly && !isAuth) ? null : (
            <AppLink
                theme={AppLinkTheme.SECONDARY}
                to={item.path}
                className={classNames(cls.item, { [cls.collapsed]: collapsed })}
            >
                <item.Icon className={cls.icon} />
                <span className={cls.link}>
                    {t(item.text)}
                </span>
            </AppLink>
        )
    );
});
