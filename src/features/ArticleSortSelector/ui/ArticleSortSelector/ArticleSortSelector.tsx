import { useTranslation } from 'react-i18next';
import { ArticleSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import type { SortOrder } from '@/shared/types';
import cls from './ArticleSortSelector.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { ListBox, type ListBoxItem } from '@/shared/ui/redesigned/Popups';

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
    const orderOptions: ListBoxItem<SortOrder>[] = [
        {
            value: 'asc',
            content: t('возрастанию'),
        },
        {
            value: 'desc',
            content: t('убыванию'),
        },
    ];
    const sortFieldOptions: ListBoxItem<ArticleSortField>[] = [
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
        <div
            className={classNames(cls.ArticleSortSelectorRedesigned, {}, [
                className,
            ])}
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
    );
}
