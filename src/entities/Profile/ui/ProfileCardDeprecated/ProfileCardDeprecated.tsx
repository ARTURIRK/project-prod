import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCardDeprecated.module.scss';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
    Text as TextDeprecated,
    AlignText,
    TextTheme,
} from '@/shared/ui/deprecated/Text';

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation();

    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCard, {}, [cls.error])}
        >
            <TextDeprecated
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={AlignText.CENTER}
            />
        </HStack>
    );
};

export const ProfileCardDeprecatedLoader = () => (
    <HStack
        justify="center"
        max
        className={classNames(cls.ProfileCard, { [cls.loading]: true })}
    >
        <Loader />
    </HStack>
);

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        readonly,
        onChangeProfileInfo,
    } = props;
    const { t } = useTranslation('profile');

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack
            gap="8"
            max
            className={classNames(cls.ProfileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack
                    justify="center"
                    max
                    className={cls.avatarWrapper}
                >
                    <AvatarDeprecated src={data?.avatar} />
                </HStack>
            )}
            <InputDeprecated
                readonly={readonly}
                className={cls.input}
                value={data?.firstName}
                placeholder={t('Ваше имя')}
                onChange={(value) => onChangeProfileInfo('firstName', value)}
                data-testid="ProfileCard.FirstName"
            />
            <InputDeprecated
                readonly={readonly}
                className={cls.input}
                value={data?.lastName}
                placeholder={t('Ваша фамилия')}
                onChange={(value) => onChangeProfileInfo('lastName', value)}
                data-testid="ProfileCard.LastName"
            />
            <InputDeprecated
                readonly={readonly}
                className={cls.input}
                value={data?.age}
                placeholder={t('Ваш возраст')}
                onChange={(value) => onChangeProfileInfo('age', value)}
                data-testid="ProfileCard.Age"
            />
            <InputDeprecated
                readonly={readonly}
                className={cls.input}
                value={data?.city}
                placeholder={t('Ваш город')}
                onChange={(value) => onChangeProfileInfo('city', value)}
                data-testid="ProfileCard.City"
            />
            <InputDeprecated
                readonly={readonly}
                className={cls.input}
                value={data?.username}
                placeholder={t('Имя пользователя')}
                onChange={(value) => onChangeProfileInfo('username', value)}
                data-testid="ProfileCard.UserName"
            />
            <InputDeprecated
                readonly={readonly}
                className={cls.input}
                value={data?.avatar}
                placeholder={t('Введите ссылку на аватар')}
                onChange={(value) => onChangeProfileInfo('avatar', value)}
                data-testid="ProfileCard.Avatar"
            />
            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChange={(value) => onChangeProfileInfo('currency', value)}
                readonly={readonly}
                data-testid="ProfileCard.Currency"
            />
            <CountrySelect
                className={cls.input}
                value={data?.country}
                onChange={(value) => onChangeProfileInfo('country', value)}
                readonly={readonly}
                data-testid="ProfileCard.Country"
            />
        </VStack>
    );
});
