import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    DynamicModuleLoader,
    type ReducersList,
} from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { AlignText, Text } from '@/shared/ui/deprecated/Text';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import DateIcon from '@/shared/assets/icons/date.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { HStack, VStack } from '@/shared/ui/deprecated/Stack';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { fetchArticleById } from '../../../Article/model/services/fetchArticleById/fetchArticleById';
import { ArticleBlock } from '../../model/types/article';
import { ArticleBlockType } from '../../model/consts/consts';
import { articleDetailsReducer } from '../../model/slices/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';

interface Props {
    className?: string;
    id?: string;
}
const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};
export const ArticleDetails = memo(({ className, id }: Props) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('article');
    const error = useAppSelector((state) => state.articleDetails?.error || '');
    const isLoading = useAppSelector(
        (state) => state.articleDetails?.isLoading || false,
    );
    const article = useAppSelector((state) => state.articleDetails?.data);
    const renderBlock = (block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.CODE:
                return (
                    <ArticleCodeBlockComponent
                        className={cls.block}
                        block={block}
                        key={block.id}
                    />
                );
            case ArticleBlockType.IMAGE:
                return (
                    <ArticleImageBlockComponent
                        className={cls.block}
                        block={block}
                        key={block.id}
                    />
                );
            case ArticleBlockType.TEXT:
                return (
                    <ArticleTextBlockComponent
                        className={cls.block}
                        block={block}
                        key={block.id}
                    />
                );
            default:
                return null;
        }
    };
    useInitialEffect(() => dispatch(fetchArticleById(id)));
    let content;
    if (isLoading) {
        content = (
            <>
                <Skeleton
                    className={cls.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <Skeleton
                    className={cls.title}
                    width={300}
                    height={32}
                />
                <Skeleton
                    className={cls.skeleton}
                    width={600}
                    height={24}
                />
                <Skeleton
                    className={cls.skeleton}
                    width="100%"
                    height={200}
                />
                <Skeleton
                    className={cls.skeleton}
                    width="100%"
                    height={200}
                />
            </>
        );
    } else if (error) {
        content = (
            <Text
                align={AlignText.CENTER}
                title={t('Произошла ошибка при загрузке статьи')}
            />
        );
    } else {
        content = (
            <>
                <VStack
                    gap="4"
                    data-testid="ArticleDetails.Info"
                >
                    <HStack justify="center">
                        <Avatar
                            size={200}
                            src={article?.img}
                            className={cls.avatar}
                        />
                    </HStack>
                    <Text
                        title={article?.title}
                        text={article?.subtitle}
                        className={cls.title}
                    />
                    <HStack
                        gap="8"
                        className={cls.articleInfo}
                    >
                        <Icon
                            className={cls.icon}
                            Svg={EyeIcon}
                        />
                        <Text text={String(article?.views)} />
                    </HStack>
                    <HStack gap="8">
                        <Icon
                            className={cls.icon}
                            Svg={DateIcon}
                        />
                        <Text text={article?.createdAt} />
                    </HStack>
                </VStack>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }
    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                gap="16"
                className={className}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
