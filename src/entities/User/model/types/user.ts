import { FeatureFlags } from '@/shared/types';
import { UserRole } from '../consts/consts';
import { JsonSettings } from './jsonSettings';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeatureFlags;
    jsonSettings?: JsonSettings;
}

export interface UserSchema {
    authData?: User;
    _initied: boolean;
}
