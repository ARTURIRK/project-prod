import { memo } from 'react';
import { Profile } from '../../models/types/profile';

import {
    ProfileCardRedesigned,
    ProfileCardRedesignedError,
    ProfileCardRedesignedSkeleton,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';

export interface ProfileCardProps {
    onChangeProfileInfo: (
        key: keyof Profile,
        value: Profile[keyof Profile],
    ) => void;
    isLoading?: boolean;
    className?: string;
    error?: string;
    data?: Profile;
    readonly?: boolean;
}

export const ProfileCard = memo(
    ({ isLoading, error, ...props }: ProfileCardProps) => {
        if (isLoading) {
            return <ProfileCardRedesignedSkeleton />;
        }

        if (error) {
            return <ProfileCardRedesignedError />;
        }

        return <ProfileCardRedesigned {...props} />;
    },
);
