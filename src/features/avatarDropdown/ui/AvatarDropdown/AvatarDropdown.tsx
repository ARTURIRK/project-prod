import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getRouteAdmin, getRouteProfile } from '@/shared/const';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Dropdown } from '@/shared/ui/deprecated/Popups';
import {
    getUserAuthData,
    isUserAdmin,
    isUserModerator,
    userActions,
} from '@/entities/User';

interface Props {
    className?: string;
}

export const AvatarDropdown = memo(({ className }: Props) => {
    const isAdmin = useSelector(isUserAdmin);
    const isModerator = useSelector(isUserModerator);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);

    const onLogout = () => {
        dispatch(userActions.logout());
    };

    if (!authData) {
        return null;
    }

    return (
        <Dropdown
            className={className}
            direction="bottom left"
            items={[
                ...(isAdmin || isModerator
                    ? [
                          {
                              content: t('Админка'),
                              href: getRouteAdmin(),
                          },
                      ]
                    : []),
                {
                    content: t('Выйти'),
                    onClick: onLogout,
                },
                {
                    content: t('Профиль'),
                    href: getRouteProfile(authData.id),
                },
            ]}
            trigger={
                <Avatar
                    fallbackInverted
                    size={30}
                    src={authData.avatar}
                />
            }
        />
    );
});
