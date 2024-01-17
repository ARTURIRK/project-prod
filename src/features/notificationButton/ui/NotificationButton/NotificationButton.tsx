import { memo } from 'react';
import { NotificationList } from 'entities/Notification';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Popover } from 'shared/ui/Popups';
import { Icon } from 'shared/ui/Icon/Icon';
import BellIcon from 'shared/assets/icons/bell.svg';
import cls from './NotificationButton.module.scss';

interface Props {
    className?: string;
}

export const NotificationButton = memo(({ className }: Props) => (
    <Popover
        className={classNames(cls.NotificationButton, {}, [className])}
        direction="bottom left"
        trigger={(
            <Button theme={ButtonTheme.CLEAR}>
                <Icon Svg={BellIcon} inverted />
            </Button>
        )}
    >
        <NotificationList className={cls.notifications} />
    </Popover>
));
