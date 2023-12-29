import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    Profile, ProfileCard,
} from 'entities/Profile';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from 'shared/ui/Stack';
import { ValidateProfileError } from '../../model/consts/consts';
import { getProfileInfo } from '../../model/selectors/getProfileInfo';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { fetchProfileData } from '../../model/servives/fetchProfileData/fetchProfileData';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}
const reducers: ReducersList = {
    profile: profileReducer,
};
export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const profile = useSelector(getProfileInfo);
    const validateErrorTranslations = {
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Не указаны имя или фамилия'),
        [ValidateProfileError.SERVER_ERROR]: t('Ошбика серера'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректно указан возраст'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректно указана страна'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    };
    useInitialEffect(() => {
        if (id) { dispatch(fetchProfileData(id)); }
    });
    const onChangeProfileInfo = useCallback((key: keyof Profile, value: Profile[keyof Profile]) => {
        if (key === 'age') {
            const newValue = (value as string)?.replace(/\D+/, '');
            dispatch(profileActions.updateProfile({ age: Number(newValue) || 0 }));
        } else {
            dispatch(profileActions.updateProfile({ [key]: value || '' }));
        }
    }, [dispatch]);
    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap="16" max className={classNames('', {}, [className])}>
                <EditableProfileCardHeader />
                {
                    profile?.validateError?.length
                    && profile?.validateError.map((el) => (
                        <Text
                            key={el}
                            theme={TextTheme.ERROR}
                            text={validateErrorTranslations[el]}
                            data-testid="EditableProfileCard.Error"
                        />
                    ))
                }
                <ProfileCard
                    onChangeProfileInfo={onChangeProfileInfo}
                    isLoading={profile?.isLoading}
                    readonly={profile?.readonly}
                    error={profile?.error}
                    data={profile?.form}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});
