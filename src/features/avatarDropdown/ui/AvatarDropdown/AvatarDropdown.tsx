import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getRouteAdmin, getRouteProfile } from '@/shared/const';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { getUserAuthData, isUserAdmin, isUserModerator, userActions } from '@/entities/User';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { ToggleFeatures } from '@/shared/lib/features';
import { classNames } from '@/shared/lib/classNames/classNames';

interface Props {
    className?: string;
}

export const AvatarDropdown = memo(({ className }: Props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isModerator = useSelector(isUserModerator);
    const authData = useSelector(getUserAuthData);

    const onLogout = () => {
        dispatch(userActions.logout());
    };

    const isAdminPanelAvailable = isAdmin || isModerator;

    if (!authData) {
        return null;
    }

    const items = [
        ...(isAdminPanelAvailable
            ? [
                  {
                      content: t('Админка'),
                      href: getRouteAdmin(),
                  },
              ]
            : []),
        {
            content: t('Профиль'),
            href: getRouteProfile(authData.id),
        },
        {
            content: t('Выйти'),
            onClick: onLogout,
        },
    ];

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Dropdown
                    direction="bottom left"
                    className={classNames('', {}, [className])}
                    items={items}
                    trigger={
                        <Avatar
                            size={40}
                            src={authData.avatar}
                        />
                    }
                />
            }
            off={
                <DropdownDeprecated
                    direction="bottom left"
                    className={classNames('', {}, [className])}
                    items={items}
                    trigger={
                        <AvatarDeprecated
                            fallbackInverted
                            size={30}
                            src={authData.avatar}
                        />
                    }
                />
            }
        />
    );
});
