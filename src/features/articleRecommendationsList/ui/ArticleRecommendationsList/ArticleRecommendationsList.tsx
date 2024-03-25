import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import { ToggleFeatures } from '@/shared/lib/features';
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
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Text
                        size="l"
                        title={t('Рекомендуем')}
                    />
                }
                off={
                    <TextDeprecated
                        size={TextSize.L}
                        title={t('Рекомендуем')}
                    />
                }
            />
            <ArticleList
                articles={articlesList}
                target="_blank"
            />
        </VStack>
    );
});
