import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import { Text } from '@/shared/ui/redesigned/Text';

interface Props {
    className?: string;
}

export const ArticleRecommendationsList = memo(({ className }: Props) => {
    const { t } = useTranslation();
    const {
        isLoading,
        data: articlesList,
        error,
    } = useArticleRecommendationsList(3);

    if (isLoading || error || !articlesList) {
        return null;
    }

    return (
        <VStack
            data-testid="ArticleRecommendationsList"
            gap="8"
            className={classNames('', {}, [className])}
        >
            <Text
                size="l"
                title={t('Рекомендуем')}
            />
            <ArticleList
                articles={articlesList}
                target="_blank"
            />
        </VStack>
    );
});
