import { memo, useCallback } from 'react';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import {
    DynamicModuleLoader,
    type ReducersList,
} from '@/shared/lib/components';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Page } from '@/widgets/Page';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

interface ArticlesPageProps {
    className?: string;
}
const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};
export default memo((props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);
    const content = (
        <StickyContentLayout
            left={<ViewSelectorContainer />}
            right={<FiltersContainer />}
            content={
                <Page
                    data-testid="ArticlesPage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames(cls.ArticlesPageRedesigned, {}, [
                        className,
                    ])}
                >
                    <ArticleInfiniteList className={cls.list} />
                    <ArticlePageGreeting />
                </Page>
            }
        />
    );

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            {content}
        </DynamicModuleLoader>
    );
});
