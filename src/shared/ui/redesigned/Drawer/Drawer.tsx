import { memo, ReactNode, useCallback, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { AnimationProvider, useAnimationLibs } from '@/shared/lib/components';
import { Overlay } from '../Overlay';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal';

interface Props {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const height = window.innerHeight - 100;

export const DrawerContent = memo(
    ({ className, children, onClose, isOpen, lazy }: Props) => {
        const { Spring, Gesture } = useAnimationLibs();
        const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
        const { theme } = useTheme();
        const openDrawer = useCallback(() => {
            api.start({ y: 0, immediate: false });
        }, [api]);

        useEffect(() => {
            if (isOpen) {
                openDrawer();
            }
        }, [api, isOpen, openDrawer]);

        const close = (velocity = 0) => {
            api.start({
                y: height,
                immediate: false,
                config: { ...Spring.config.stiff, velocity },
                onResolve: onClose,
            });
        };

        const bind = Gesture.useDrag(
            ({
                last,
                velocity: [, vy],
                direction: [, dy],
                movement: [, my],
                cancel,
            }) => {
                if (my < -70) cancel();

                if (last) {
                    if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                        close();
                    } else {
                        openDrawer();
                    }
                } else {
                    api.start({ y: my, immediate: true });
                }
            },
            {
                from: () => [0, y.get()],
                filterTaps: true,
                bounds: { top: 0 },
                rubberband: true,
            },
        );

        if (!isOpen) {
            return null;
        }

        const display = y.to((py) => (py < height ? 'block' : 'none'));

        return (
            <Portal element={document.getElementById('app') ?? document.body}>
                <div
                    className={classNames(cls.Drawer, {}, [
                        className,
                        theme,
                        'app_drawer',
                        cls.drawerNew,
                    ])}
                >
                    <Overlay onClick={close} />
                    <Spring.a.div
                        className={cls.sheet}
                        style={{
                            display,
                            bottom: `calc(-100vh + ${height - 100}px)`,
                            y,
                        }}
                        {...bind()}
                    >
                        {children}
                    </Spring.a.div>
                </div>
            </Portal>
        );
    },
);

const DrawerAsync = memo((props: Props) => {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
});

export const Drawer = (props: Props) => (
    <AnimationProvider>
        <DrawerAsync {...props} />
    </AnimationProvider>
);
