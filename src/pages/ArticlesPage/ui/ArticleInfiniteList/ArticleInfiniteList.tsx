import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { Text } from '@/shared/ui/redesigned/Text';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { getArticles } from '../../model/slices/articlesPageSlice';
import {
    getArticlesPageError,
    getArticlesPageLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

interface Props {
    className?: string;
}

export function ArticleInfiniteList({ className }: Props) {
    const [searchParams] = useSearchParams();
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);
    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });
    if (error) {
        return <Text text={t('Произошла ошибка при загрузке статей')} />;
    }
    return (
        <ArticleList
            className={classNames('', {}, [className])}
            isLoading={isLoading}
            view={view}
            articles={articles}
        />
    );
}
