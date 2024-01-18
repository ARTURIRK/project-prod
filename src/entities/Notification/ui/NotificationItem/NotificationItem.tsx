import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import type { Notification } from '../../models/types/notifications';
import cls from './NotificationItem.module.scss';

interface Props {
 className?: string;
 notification: Notification
}

export const NotificationItem = memo(({ className, notification }: Props) => {
    const content = (
        <Card theme={CardTheme.OUTLINED} className={classNames(cls.NotificationItem, {}, [className])}>
            <Text title={notification.title} text={notification.description} />
        </Card>
    );
    if (notification.href) {
        return (
            <a className={cls.link} target="_blank" href={notification.href} rel="noreferrer">
                {content}
            </a>
        );
    }
    return content;
});
