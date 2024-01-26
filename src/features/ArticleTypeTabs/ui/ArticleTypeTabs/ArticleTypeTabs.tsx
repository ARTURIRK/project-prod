import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';

interface Props {
 className?: string;
 value: ArticleType;
 onChangeType: (tab: TabItem) => void;
}

export const ArticleTypeTabs = memo(({ className, value, onChangeType }: Props) => {
    const { t } = useTranslation();
    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: ArticleType.ALL,
                content: t('Все'),
            }, {
                value: ArticleType.IT,
                content: t('Айти'),
            },
            {
                value: ArticleType.SCIENCE,
                content: t('Наука'),
            },
            {
                value: ArticleType.ECONOMICS,
                content: t('Экономика'),
            }],
        [t],
    );
    return (
        <div className={classNames('', {}, [className])}>
            <Tabs
                tabs={typeTabs}
                onTabClick={onChangeType}
                value={value}
            />

        </div>
    );
});
