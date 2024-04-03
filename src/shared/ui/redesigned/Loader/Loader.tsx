import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

interface Props {
    className?: string;
}

export const Loader = memo(({ className }: Props) => (
    <div className={classNames('lds-ellipsis', {}, [className])}>
        <div />
        <div />
        <div />
        <div />
    </div>
));
