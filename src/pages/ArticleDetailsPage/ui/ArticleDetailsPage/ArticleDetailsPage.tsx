import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArticleDetails } from 'entities/Article';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';

interface Props {
 className?: string;
}

const ArticleDetailsPage = (({ className }: Props) => {
    const { t } = useTranslation('article');

    const { id } = useParams<{id: string}>();

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            {
                id ? <ArticleDetails id={id} /> : <>{t('Статья не найдена')}</>
            }

        </div>
    );
});

export default memo(ArticleDetailsPage);
