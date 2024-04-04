import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import cls from './ArticleDetailsSkeleton.module.scss';

export function ArticleDetailsSkeleton() {
    return (
        <VStack
            gap="16"
            max
        >
            <Skeleton
                className={cls.avatar}
                width={200}
                height={200}
                border="50%"
            />
            <Skeleton
                width={300}
                height={32}
            />
            <Skeleton
                width={600}
                height={24}
            />
            <Skeleton
                width="100%"
                height={200}
            />
            <Skeleton
                width="100%"
                height={200}
            />
        </VStack>
    );
}
