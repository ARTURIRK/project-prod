import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleList } from '@/entities/Article';
import { Text, TextSize } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface Props {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: Props) => {
    const { className } = props;
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
                size={TextSize.L}
                title={t('Рекомендуем')}
            />
            <ArticleList
                articles={articlesList}
                isLoading={isLoading}
                target="_blank"
            />
        </VStack>
    );
});
