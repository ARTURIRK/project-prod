import { useCallback } from 'react';
import {
    fetchProfileData, ProfileCard, profileReducer, getProfileInfo, profileActions, ValidateProfileError, Profile,
} from 'entities/Profile';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

interface Props {
 className?: string;
}
const reducers: ReducersList = {
    profile: profileReducer,
};

export default function ProfilePage({ className }: Props) {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('profile');
    const profile = useSelector(getProfileInfo);
    const { id } = useParams<{id: string}>();
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
            <Page className={classNames('', {}, [className])}>
                <ProfilePageHeader readonly={profile?.readonly} />
                {
                    profile?.validateError?.length
                    && profile.validateError.map((el) => (
                        <Text
                            key={el}
                            theme={TextTheme.ERROR}
                            text={validateErrorTranslations[el]}
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
            </Page>
        </DynamicModuleLoader>
    );
}
