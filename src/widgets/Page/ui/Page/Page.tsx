import { MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
    getScrollPositionByPath,
    scrollSaverActions,
} from '@/features/scrollSaver';
import { StateSchema } from '@/app/providers/StoreProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle';
import { TestProps } from '@/shared/types';
import cls from './Page.module.scss';

interface Props extends TestProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = (props: Props) => {
    const { className, children, onScrollEnd } = props;
    const { pathname } = useLocation();
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const scrollPosition = useSelector((state: StateSchema) =>
        getScrollPositionByPath(state, pathname),
    );
    const onScrollHandler = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            scrollSaverActions.setScrollPosition({
                path: pathname,
                position: e.currentTarget.scrollTop,
            }),
        );
    }, 500);
    useInfiniteScroll({
        triggerRef,
        wrapperRef: undefined,
        callback: onScrollEnd,
    });
    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });
    return (
        <main
            data-testid={props['data-testid'] ?? 'Page'}
            onScroll={onScrollHandler}
            ref={wrapperRef}
            className={classNames(cls.PageRedesigned, {}, [className])}
        >
            {children}
            {onScrollEnd ? (
                <div
                    className={cls.trigger}
                    ref={triggerRef}
                />
            ) : null}
        </main>
    );
};
