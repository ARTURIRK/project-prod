import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface Props {
    className?: string;
}

export const FiltersContainer = memo(({ className }: Props) => {
    const {
        onChangeSearch,
        onChangeOrder,
        onChangeSort,
        onChangeType,
        search,
        order,
        sort,
        type,
    } = useArticleFilters();

    return (
        <ArticlesFilters
            onChangeSearch={onChangeSearch}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
            onChangeType={onChangeType}
            className={className}
            search={search}
            order={order}
            sort={sort}
            type={type}
        />
    );
});
