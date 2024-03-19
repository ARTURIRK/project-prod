import { t } from 'i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { CommentCard } from '../CommentCard/CommentCard';
import type { IComment } from '../../model/types/comment';

interface Props {
    className?: string;
    comments?: IComment[];
    isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: Props) => {
    if (isLoading) {
        return (
            <VStack
                gap="16"
                align="stretch"
                max
                className={classNames('', {}, [className])}
            >
                <CommentCard isLoading={isLoading} />
                <CommentCard isLoading={isLoading} />
                <CommentCard isLoading={isLoading} />
            </VStack>
        );
    }
    return (
        <VStack
            gap="16"
            align="stretch"
            max
            className={classNames('', {}, [className])}
        >
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        isLoading={isLoading}
                        comment={comment}
                    />
                ))
            ) : (
                <Text title={t('Комментариев нет')} />
            )}
        </VStack>
    );
});
