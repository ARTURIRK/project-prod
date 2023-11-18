import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CurrencySelect } from 'entities/Currency';
import { CountrySelect } from 'entities/Country';
import { classNames } from 'shared/lib/classNames/classNames';
import { AlignText, Text, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Profile } from '../../models/types/profile';
import cls from './ProfileCard.module.scss';

interface Props {
    onChangeProfileInfo: (key: keyof Profile, value: Profile[keyof Profile]) => void;
    isLoading?: boolean;
    className?: string;
    error?: string;
    data?: Profile;
    readonly?: boolean;
}

export const ProfileCard = memo(({
    onChangeProfileInfo,
    className,
    data,
    isLoading,
    error,
    readonly,
}: Props) => {
    const { t } = useTranslation();
    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке')}
                    text={t('Попробуйте обновить страницу')}
                    align={AlignText.CENTER}
                />
            </div>
        );
    }
    const Mods = {
        [cls.editing]: !readonly,
    };
    return (
        <div className={classNames(cls.ProfileCard, Mods, [className])}>
            <div className={cls.data}>

                {data?.avatar
                && (
                    <div className={cls.avatarWrapper}>
                        <Avatar alt="AVATAR" src={data.avatar} size={80} />
                    </div>
                )}
                <Input
                    readonly={readonly}
                    className={cls.input}
                    value={data?.firstName}
                    placeholder={t('Ваше имя')}
                    onChange={(value) => onChangeProfileInfo('firstName', value)}
                />
                <Input
                    readonly={readonly}
                    className={cls.input}
                    value={data?.lastName}
                    placeholder={t('Ваша фамилия')}
                    onChange={(value) => onChangeProfileInfo('lastName', value)}
                />
                <Input
                    readonly={readonly}
                    className={cls.input}
                    value={data?.age}
                    placeholder={t('Ваш возраст')}
                    onChange={(value) => onChangeProfileInfo('age', value)}
                />
                <Input
                    readonly={readonly}
                    className={cls.input}
                    value={data?.city}
                    placeholder={t('Ваш город')}
                    onChange={(value) => onChangeProfileInfo('city', value)}
                />
                <Input
                    readonly={readonly}
                    className={cls.input}
                    value={data?.username}
                    placeholder={t('Имя пользователя')}
                    onChange={(value) => onChangeProfileInfo('username', value)}
                />
                <Input
                    readonly={readonly}
                    className={cls.input}
                    value={data?.avatar}
                    placeholder={t('Введите ссылку на аватар')}
                    onChange={(value) => onChangeProfileInfo('avatar', value)}
                />
                <CurrencySelect
                    className={cls.input}
                    value={data?.currency}
                    onChange={(value) => onChangeProfileInfo('currency', value)}
                    readonly={readonly}
                />
                <CountrySelect
                    className={cls.input}
                    value={data?.country}
                    onChange={(value) => onChangeProfileInfo('country', value)}
                    readonly={readonly}
                />
            </div>
        </div>
    );
});
