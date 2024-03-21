import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { ArticleView } from '../../model/consts/consts';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';
import { Article } from '../../model/types/article';

interface Props {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.SMALL ? 9 : 3).fill(0).map((item, index) => (
        <ArticleListItemSkeleton
            className={cls.card}
            key={index}
            view={view}
        />
    ));

export const ArticleList = memo(
    ({
        className,
        articles,
        view = ArticleView.SMALL,
        isLoading,
        target,
    }: Props) => {
        const { t } = useTranslation();

        if (!isLoading && !articles.length) {
            return (
                <div
                    className={classNames(cls.ArticleList, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <Text
                        size={TextSize.L}
                        title={t('Статьи не найдены')}
                    />
                </div>
            );
        }

        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    className,
                    cls[view],
                ])}
                data-testid="ArticleList"
            >
                {articles.map((item) => (
                    <ArticleListItem
                        article={item}
                        view={view}
                        target={target}
                        key={item.id}
                        className={cls.card}
                    />
                ))}
                {isLoading && getSkeletons(view)}
            </div>
        );
    },
);
