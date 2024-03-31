import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleSortSelector } from '@/features/articleSortSelector';
import { ArticleTypeTabs } from '@/features/articleTypeTabs';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { SortOrder } from '@/shared/types';
import cls from './ArticlesFilters.module.scss';

interface Props {
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeType: (type: ArticleType) => void;
    onChangeSearch: (value: string) => void;
    sort: ArticleSortField;
    className?: string;
    type: ArticleType;
    order: SortOrder;
    search: string;
}

export const ArticlesFilters = memo(
    ({
        onChangeSearch,
        onChangeOrder,
        onChangeType,
        onChangeSort,
        className,
        search,
        sort,
        order,
        type,
    }: Props) => {
        const { t } = useTranslation();
        return (
            <Card
                className={classNames(cls.ArticlesFilters, {}, [className])}
                padding="24"
            >
                <VStack gap="32">
                    <Input
                        addonLeft={<Icon Svg={SearchIcon} />}
                        onChange={onChangeSearch}
                        placeholder={t('Поиск')}
                        value={search}
                    />
                    <ArticleTypeTabs
                        onChangeType={onChangeType}
                        className={cls.tabs}
                        value={type}
                    />
                    <ArticleSortSelector
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                        order={order}
                        sort={sort}
                    />
                </VStack>
            </Card>
        );
    },
);
