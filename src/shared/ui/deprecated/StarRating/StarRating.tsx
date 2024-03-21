import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import { Icon } from '../../redesigned/Icon/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';

interface Props {
    onSelect?: (starsCount: number) => void;
    selectedStars?: number;
    className?: string;
    size?: number;
}

const stars = [1, 2, 3, 4, 5];
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const StarRating = memo(
    ({ selectedStars = 0, className, size = 30, onSelect }: Props) => {
        const [currentStarsCount, setCurrentStarsCount] =
            useState(selectedStars);
        const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

        const onHover = (starsCount: number) => () => {
            if (!isSelected) {
                setCurrentStarsCount(starsCount);
            }
        };

        const onLeave = () => {
            if (!isSelected) {
                setCurrentStarsCount(0);
            }
        };

        const onClick = (starsCount: number) => () => {
            if (!isSelected) {
                onSelect?.(starsCount);
                setCurrentStarsCount(starsCount);
                setIsSelected(true);
            }
        };

        return (
            <div className={classNames(cls.StarRating, {}, [className])}>
                {stars.map((starNumber) => (
                    <Icon
                        className={classNames(
                            cls.starIcon,
                            { [cls.selected]: isSelected },
                            [
                                currentStarsCount >= starNumber
                                    ? cls.hovered
                                    : cls.normal,
                            ],
                        )}
                        Svg={StarIcon}
                        key={starNumber}
                        width={size}
                        height={size}
                        onMouseLeave={onLeave}
                        onMouseEnter={onHover(starNumber)}
                        onClick={onClick(starNumber)}
                        data-testid={`StarRating.${starNumber}`}
                        data-selected={currentStarsCount >= starNumber}
                    />
                ))}
            </div>
        );
    },
);