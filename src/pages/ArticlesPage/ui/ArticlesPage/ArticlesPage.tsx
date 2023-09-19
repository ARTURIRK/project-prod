import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';

interface Props {
 className?: string;
}

const ArticlesPage = (({ className }: Props) => {
    const { t } = useTranslation('article');
    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            {'ARTICLESPAGE '}
        </div>
    );
});

export default memo(ArticlesPage);
