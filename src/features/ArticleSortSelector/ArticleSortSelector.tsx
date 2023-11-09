import { ArticleSortField } from 'entities/Article/model/types/article';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { SortOrder } from 'shared/types';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import cls from './ArticleSortSelector.module.scss';

interface Props {
 className?: string;
 sort: ArticleSortField;
 order: SortOrder;
 onChangeSort: (sort: ArticleSortField) => void;
 onChangeOrder: (order: SortOrder) => void;
}

export function ArticleSortSelector({
    className, sort, order, onChangeSort, onChangeOrder,
}: Props) {
    const { t } = useTranslation();
    const orderOptions : SelectOption<SortOrder>[] = [
        {
            value: 'asc',
            content: t('возрастанию'),
        },
        {
            value: 'desc',
            content: t('убыванию'),
        },
    ];
    const sortFieldOptions : SelectOption<ArticleSortField>[] = [
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
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select<ArticleSortField>
                label={t('Сортировать ПО')}
                options={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
            />
            <Select<SortOrder>
                label={t('по')}
                options={orderOptions}
                value={order}
                onChange={onChangeOrder}
                className={cls.order}
            />
        </div>
    );
}