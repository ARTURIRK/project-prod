import { t } from 'i18next';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';
import type { IComment } from '../../model/types/comment';

interface Props {
 className?: string;
 comments?: IComment[];
 isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: Props) => (
    <div className={classNames(cls.CommentList, {}, [className])}>
        {comments?.length
            ? comments.map((comment) => (
                <CommentCard
                    key={comment.id}
                    isLoading={isLoading}
                    className={cls.comment}
                    comment={comment}
                />
            ))
            : <Text title={t('Комментариев нет')} /> }
    </div>
));
