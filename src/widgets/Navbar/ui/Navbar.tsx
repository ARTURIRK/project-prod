import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import {
    getUserAuthData, isUserAdmin, isUserModerator, userActions,
} from 'entities/User';
import { Text } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Dropdown } from 'shared/ui/Popups/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { HStack } from 'shared/ui/Stack';
import { Icon } from 'shared/ui/Icon/Icon';
import BellIcon from 'shared/assets/icons/bell.svg';
import { Popover } from 'shared/ui/Popups';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isModerator = useSelector(isUserModerator);
    const dispatch = useDispatch();

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text className={cls.appName} title={t('Artur APP')} />
                <AppLink
                    to={RoutePath.article_create}
                    theme={AppLinkTheme.SECONDARY}
                    className={cls.createBtn}
                >
                    {t('Создать статью')}
                </AppLink>
                <HStack gap="16" className={cls.actions}>
                    <Popover
                        direction="bottom left"
                        trigger={(
                            <Button theme={ButtonTheme.CLEAR}>
                                <Icon inverted Svg={BellIcon} />
                            </Button>
                        )}
                    >
                        <Text className={cls.appName} title={t('Artur APP')} />
                    </Popover>

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
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onShowModal}
            >
                {t('Войти')}
            </Button>
            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            )}
        </header>
    );
});
