import { getRouteProfile } from '@/shared/const';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/deprecated/Stack';
import type { IComment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

interface Props {
    className?: string;
    comment?: IComment;
    isLoading?: boolean;
}

export function CommentCard({ className, comment, isLoading }: Props) {
    if (isLoading) {
        return (
            <div
                className={classNames(cls.CommentCard, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <VStack gap="8">
                    <Skeleton
                        border="50%"
                        width={30}
                        height={30}
                    />
                    <Skeleton
                        height={16}
                        width={100}
                        className={cls.username}
                    />
                </VStack>
                <Skeleton
                    className={cls.text}
                    width="100%"
                    height={50}
                />
            </div>
        );
    }
    if (!comment) {
        return null;
    }
    return (
        <VStack
            gap="8"
            className={classNames(cls.CommentCard, {}, [className])}
            data-testid="CommentCard.Content"
        >
            <AppLink to={getRouteProfile(comment.user.id)}>
                {comment.user.avatar && (
                    <Avatar
                        size={30}
                        src={comment.user.avatar}
                    />
                )}
                <Text title={comment.user.username} />
            </AppLink>
            <Text
                className={cls.text}
                text={comment.text}
            />
        </VStack>
    );
}
