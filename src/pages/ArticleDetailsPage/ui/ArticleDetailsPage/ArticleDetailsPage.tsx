import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleRating } from '@/features/articleRating';
import { ArticleDetails } from '@/entities/Article';
import { Page } from '@/widgets/Page';
import {
    DynamicModuleLoader,
    type ReducersList,
} from '@/shared/lib/components';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { articleDetailsPageReducer } from '../../model/slices';
import cls from './ArticleDetailsPage.module.scss';
import { getFeatureFlag } from '@/shared/lib/features';

interface Props {
    className?: string;
}
const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};
const ArticleDetailsPage = ({ className }: Props) => {
    const { id } = useParams<{ id: string }>();
    if (!id) {
        return null;
    }
    const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');
    const isArticleRecommendationsEnabled = getFeatureFlag(
        'isArticleRecommendationsEnabled',
    );
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <VStack
                    max
                    gap="32"
                >
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    {isArticleRatingEnabled && <ArticleRating articleId={id} />}
                    {isArticleRecommendationsEnabled && (
                        <ArticleRecommendationsList
                            className={cls.recommendations}
                        />
                    )}
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
