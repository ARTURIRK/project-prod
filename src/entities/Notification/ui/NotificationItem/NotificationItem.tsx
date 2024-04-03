import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import type { Notification } from '../../models/types/notifications';
import cls from './NotificationItem.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';

interface Props {
    className?: string;
    notification: Notification;
}

export const NotificationItem = memo(({ className, notification }: Props) => {
    const content = (
        <Card className={classNames(cls.NotificationItem, {}, [className])}>
            <Text
                title={notification.title}
                text={notification.description}
            />
        </Card>
    );

    if (notification.href) {
        return (
            <a
                className={cls.link}
                target="_blank"
                href={notification.href}
                rel="noreferrer"
            >
                {content}
            </a>
        );
    }

    return content;
});
