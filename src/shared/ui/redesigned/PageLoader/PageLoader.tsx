import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '../Loader/Loader';
import cls from './PageLoader.module.scss';

interface Props {
    className?: string;
}

export const PageLoader = memo(({ className }: Props) => (
    <div className={classNames(cls.PageLoader, {}, [className])}>
        <Loader />
    </div>
));
