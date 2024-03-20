import type { ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { useModal } from '@/shared/lib/hooks/useModal';
import { Portal } from '../../redesigned/Portal';
import cls from './Modal.module.scss';
import { Overlay } from '../../redesigned/Overlay';

interface Props {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Modal = ({
    className,
    children,
    isOpen,
    onClose,
    lazy,
}: Props) => {
    const { close, isMounted, isClosing } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    });
    const { theme } = useTheme();

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div
                className={classNames(cls.Modal, mods, [
                    className,
                    theme,
                    'app_modal',
                ])}
            >
                <Overlay onClick={close} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
};
