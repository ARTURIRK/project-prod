export type {
    ProfileSchema,
    Profile,
} from './models/types/profile';

export {
    profileActions,
    profileReducer,
} from './models/slice/profileSlice';

export { fetchProfileData } from './models/servives/fetchProfileData/fetchProfileData';

export { ProfileCard } from './ui/ProfileCard/ProfileCard';
