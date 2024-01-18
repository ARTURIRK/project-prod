import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';

interface Props {
    className?: string;
    onClick?: () => void;
}

export const Overlay = memo(({ className, onClick }: Props) => (
    <div onClick={onClick} className={classNames(cls.Overlay, {}, [className])} />
));
