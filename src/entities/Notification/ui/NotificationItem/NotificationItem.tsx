import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import type { Notification } from '../../models/types/notifications';
import cls from './NotificationItem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

interface Props {
    className?: string;
    notification: Notification;
}

export const NotificationItem = memo(({ className, notification }: Props) => {
    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    className={classNames(cls.NotificationItem, {}, [
                        className,
                    ])}
                >
                    <Text
                        title={notification.title}
                        text={notification.description}
                    />
                </Card>
            }
            off={
                <CardDeprecated
                    theme={CardTheme.OUTLINED}
                    className={classNames(cls.NotificationItem, {}, [
                        className,
                    ])}
                >
                    <TextDeprecated
                        title={notification.title}
                        text={notification.description}
                    />
                </CardDeprecated>
            }
        />
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
