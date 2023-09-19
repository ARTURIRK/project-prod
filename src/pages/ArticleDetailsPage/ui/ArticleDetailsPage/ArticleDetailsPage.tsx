import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';

interface Props {
 className?: string;
}

const ArticleDetailsPage = (({ className }: Props) => {
    const { t } = useTranslation('article');
    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            {'ARTICLEDETAILSPAGE '}
        </div>
    );
});

export default memo(ArticleDetailsPage);
