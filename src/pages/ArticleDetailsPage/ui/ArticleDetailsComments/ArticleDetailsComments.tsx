import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/addCommentForm';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slices/ArticleDetailsCommentsSlice/ArticleDetailsCommentsSlice';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';

interface Props {
    className?: string;
    id?: string;
}

export function ArticleDetailsComments({ className, id }: Props) {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('article');
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleRecommendationsIsLoading);
    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );
    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });
    return (
        <VStack
            className={classNames('', {}, [className])}
            gap="16"
            max
            align="stretch"
        >
            <Text
                size={TextSize.L}
                title={t('Комментарии')}
            />
            <AddCommentForm onSendComment={onSendComment} />
            <CommentList
                isLoading={commentsIsLoading}
                comments={comments}
            />
        </VStack>
    );
}
