import { StateSchema } from 'app/providers/StoreProvider';
import { getScrollPositionByPath, scrollSaverActions } from 'features/ScrollSaver';
import {
    MutableRefObject, ReactNode, UIEvent, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle';
import cls from './Page.module.scss';

interface Props {
 className?: string;
 children: ReactNode;
 onScrollEnd?: () => void;
}

export const Page = ({
    className, children, onScrollEnd,
}: Props) => {
    const { pathname } = useLocation();
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const scrollPosition = useSelector((state: StateSchema) => getScrollPositionByPath(state, pathname));
    const onScrollHandler = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollSaverActions.setScrollPosition({ path: pathname, position: e.currentTarget.scrollTop }));
    }, 500);
    useInfiniteScroll({
        callback: onScrollEnd,
        triggerRef,
        wrapperRef,
    });
    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });
    return (
        <main onScroll={onScrollHandler} ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
            {children}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
        </main>
    );
};
