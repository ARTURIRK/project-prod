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

export { getProfileInfo } from './models/selectors/getProfileInfo/getProfileInfo';

export { updateProfileData } from './models/servives/updateProfileData/updateProfileData';
