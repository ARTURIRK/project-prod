import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Profile } from 'entities/Profile/models/types/profile';
import { AlignText, Text, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';
import { memo } from 'react';
import cls from './ProfileCard.module.scss';

interface Props {
    isLoading?: boolean;
    className?: string;
    error?: string;
    data?: Profile;
    readonly?: boolean;
    onChangeLastName?: (value?: string) => void;
    onChangeFirstName?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (value: Currency) => void;
    onChangeCountry?: (value: Country) => void;
}

export const ProfileCard = memo(({
    className,
    data,
    isLoading,
    error,
    readonly,
    onChangeLastName,
    onChangeUsername,
    onChangeAvatar,
    onChangeFirstName,
    onChangeCity,
    onChangeAge,
    onChangeCurrency,
    onChangeCountry,
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
                    onChange={onChangeFirstName}
                />
                <Input
                    readonly={readonly}
                    className={cls.input}
                    value={data?.lastName}
                    placeholder={t('Ваша фамилия')}
                    onChange={onChangeLastName}
                />
                <Input
                    readonly={readonly}
                    className={cls.input}
                    value={data?.age}
                    placeholder={t('Ваш возраст')}
                    onChange={onChangeAge}
                />
                <Input
                    readonly={readonly}
                    className={cls.input}
                    value={data?.city}
                    placeholder={t('Ваш город')}
                    onChange={onChangeCity}
                />
                <Input
                    readonly={readonly}
                    className={cls.input}
                    value={data?.username}
                    placeholder={t('Имя пользователя')}
                    onChange={onChangeUsername}
                />
                <Input
                    readonly={readonly}
                    className={cls.input}
                    value={data?.avatar}
                    placeholder={t('Введите ссылку на аватар')}
                    onChange={onChangeAvatar}
                />
                <CurrencySelect
                    className={cls.input}
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    className={cls.input}
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                />
            </div>
        </div>
    );
});
