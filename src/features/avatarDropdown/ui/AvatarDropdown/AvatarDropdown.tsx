import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '@/shared/const';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';
import {
    getUserAuthData, isUserAdmin, isUserModerator, userActions,
} from '@/entities/User';

interface Props {
    className?: string;
}

export const AvatarDropdown = memo(({ className } :Props) => {
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
            direction="bottom left"
            items={[...(isAdmin || isModerator ? [{
                content: t('Админка'),
                href: RoutePath.admin_panel,
            }] : []), {
                content: t('Выйти'),
                onClick: onLogout,
            },
            {
                content: t('Профиль'),
                href: RoutePath.profile + authData.id,
            }]}
            trigger={<Avatar size={30} src={authData.avatar} />}
        />
    );
});
