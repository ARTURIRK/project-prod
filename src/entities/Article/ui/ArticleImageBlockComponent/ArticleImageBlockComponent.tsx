import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

interface Props {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
    ({ className, block }: Props) => (
        <div
            className={classNames(cls.ArticleImageBlockComponent, {}, [
                className,
            ])}
        >
            <img
                src={block.src}
                alt={block.title}
                className={cls.img}
            />
            {block.title && (
                <Text
                    text={block.title}
                    align="center"
                />
            )}
        </div>
    ),
);
