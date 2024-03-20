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
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeSort: (sort: ArticleSortField) => void;
    onChangeOrder: (order: SortOrder) => void;
}

export function ArticleSortSelector({
    className,
    sort,
    order,
    onChangeSort,
    onChangeOrder,
}: Props) {
    const { t } = useTranslation();
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
                        <Text text={t('Сортировать по:')} />
                        <ListBox<ArticleSortField>
                            items={sortFieldOptions}
                            value={sort}
                            onChange={onChangeSort}
                        />
                        <ListBox<SortOrder>
                            items={orderOptions}
                            value={order}
                            onChange={onChangeOrder}
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
                        options={sortFieldOptions}
                        label={t('Сортировать ПО')}
                        value={sort}
                        onChange={onChangeSort}
                    />
                    <Select
                        options={orderOptions}
                        label={t('по')}
                        value={order}
                        onChange={onChangeOrder}
                        className={cls.order}
                    />
                </div>
            }
        />
    );
}
