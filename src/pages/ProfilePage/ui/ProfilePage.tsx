import { useCallback } from 'react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import {
    fetchProfileData, ProfileCard, profileReducer, getProfileInfo, profileActions, ValidateProfileError,
} from 'entities/Profile';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
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

    const onChangeFirstName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ firstName: value || '' }));
    }, [dispatch]);
    const onChangeLastName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ lastName: value || '' }));
    }, [dispatch]);
    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
    }, [dispatch]);
    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }));
    }, [dispatch]);
    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }));
    }, [dispatch]);
    const onChangeAge = useCallback((value?: string) => {
        const newValue = value?.replace(/\D+/, '');
        dispatch(profileActions.updateProfile({ age: Number(newValue) || 0 }));
    }, [dispatch]);
    const onChangeCurrency = useCallback((value: Currency) => {
        dispatch(profileActions.updateProfile({ currency: value }));
    }, [dispatch]);
    const onChangeCountry = useCallback((value: Country) => {
        dispatch(profileActions.updateProfile({ country: value }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames('', {}, [className])}>
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
                    isLoading={profile?.isLoading}
                    error={profile?.error}
                    data={profile?.form}
                    onChangeFirstName={onChangeFirstName}
                    onChangeLastName={onChangeLastName}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCity={onChangeCity}
                    onChangeAge={onChangeAge}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCountry={onChangeCountry}
                    onChangeUsername={onChangeUsername}
                    readonly={profile?.readonly}
                />
            </div>
        </DynamicModuleLoader>
    );
}
