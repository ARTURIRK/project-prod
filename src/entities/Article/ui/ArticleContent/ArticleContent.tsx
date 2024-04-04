import { useSelector } from 'react-redux';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { getArticleDetailsData } from '../../model/selectors/articleDetails';
import { renderArticleBlock } from '../ArticleDetails/renderBlock';
import cls from './ArticleContent.module.scss';

export default function ArticleContent() {
    const article = useSelector(getArticleDetailsData);
    return (
        <>
            <Text
                title={article?.title}
                size="l"
                bold
            />
            <Text title={article?.subtitle} />
            <AppImage
                fallback={
                    <Skeleton
                        width="100%"
                        height={420}
                        border="16px"
                    />
                }
                src={article?.img}
                className={cls.img}
            />
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
}
