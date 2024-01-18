import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { NotificationList } from '@/entities/Notification';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { Popover } from '@/shared/ui/Popups';
import { Icon } from '@/shared/ui/Icon/Icon';
import BellIcon from '@/shared/assets/icons/bell.svg';
import cls from './NotificationButton.module.scss';

interface Props {
    className?: string;
}

export const NotificationButton = memo(({ className }: Props) => {
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    function onOpenDrawer() {
        setOpenDrawer(true);
    }
    const onCloseDrawer = useCallback(() => {
        setOpenDrawer(false);
    }, []);
    const trigger = (
        <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
            <Icon Svg={BellIcon} inverted />
        </Button>
    );
    return (
        <>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpenDrawer} onClose={onCloseDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
            <BrowserView>
                <Popover
                    className={classNames(cls.NotificationButton, {}, [className])}
                    direction="bottom left"
                    trigger={trigger}
                >
                    <NotificationList className={cls.notifications} />
                </Popover>
            </BrowserView>
        </>
    );
});
