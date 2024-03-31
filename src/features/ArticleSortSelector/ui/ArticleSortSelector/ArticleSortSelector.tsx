import { useTranslation } from 'react-i18next';
import { ArticleSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import type { SortOrder } from '@/shared/types';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';
import cls from './ArticleSortSelector.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface Props {
    onChangeSort: (sort: ArticleSortField) => void;
    onChangeOrder: (order: SortOrder) => void;
    sort: ArticleSortField;
    className?: string;
    order: SortOrder;
}

export function ArticleSortSelector({
    onChangeOrder,
    onChangeSort,
    className,
    order,
    sort,
}: Props) {
    const { t } = useTranslation('articles');
    const orderOptions: SelectOption<SortOrder>[] = [
        {
            value: 'asc',
            content: t('возрастанию'),
        },
        {
            value: 'desc',
            content: t('убыванию'),
        },
    ];
    const sortFieldOptions: SelectOption<ArticleSortField>[] = [
        {
            value: ArticleSortField.CREATED,
            content: t('дате создания'),
        },
        {
            value: ArticleSortField.TITLE,
            content: t('названию'),
        },
        {
            value: ArticleSortField.VIEW,
            content: t('просмотрам'),
        },
    ];
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <div
                    className={classNames(
                        cls.ArticleSortSelectorRedesigned,
                        {},
                        [className],
                    )}
                >
                    <VStack gap="8">
                        <Text text={t('Сортировать по')} />
                        <ListBox<ArticleSortField>
                            items={sortFieldOptions}
                            onChange={onChangeSort}
                            value={sort}
                        />
                        <ListBox<SortOrder>
                            onChange={onChangeOrder}
                            items={orderOptions}
                            value={order}
                        />
                    </VStack>
                </div>
            }
            off={
                <div
                    className={classNames(cls.ArticleSortSelector, {}, [
                        className,
                    ])}
                >
                    <Select<ArticleSortField>
                        label={t('Сортировать по')}
                        options={sortFieldOptions}
                        onChange={onChangeSort}
                        value={sort}
                    />
                    <Select
                        onChange={onChangeOrder}
                        options={orderOptions}
                        className={cls.order}
                        label={t('по')}
                        value={order}
                    />
                </div>
            }
        />
    );
}
