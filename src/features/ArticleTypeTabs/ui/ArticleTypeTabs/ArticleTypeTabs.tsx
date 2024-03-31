import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { ArticleType } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface Props {
    onChangeType: (type: ArticleType) => void;
    className?: string;
    value: ArticleType;
}

export const ArticleTypeTabs = memo(
    ({ className, value, onChangeType }: Props) => {
        const { t } = useTranslation('articles');

        const typeTabs = useMemo<TabItem[]>(
            () => [
                {
                    value: ArticleType.ALL,
                    content: t('Все статьи'),
                },
                {
                    value: ArticleType.IT,
                    content: t('Айти'),
                },
                {
                    value: ArticleType.ECONOMICS,
                    content: t('Экономика'),
                },
                {
                    value: ArticleType.SCIENCE,
                    content: t('Наука'),
                },
            ],
            [t],
        );

        const onTabClick = useCallback(
            (tab: TabItem) => {
                onChangeType(tab.value as ArticleType);
            },
            [onChangeType],
        );

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Tabs
                        direction="column"
                        tabs={typeTabs}
                        value={value}
                        onTabClick={onTabClick}
                        className={classNames('', {}, [className])}
                    />
                }
                off={
                    <TabsDeprecated
                        tabs={typeTabs}
                        value={value}
                        onTabClick={onTabClick}
                        className={classNames('', {}, [className])}
                    />
                }
            />
        );
    },
);
