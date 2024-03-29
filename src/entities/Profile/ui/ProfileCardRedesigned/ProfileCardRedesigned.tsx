import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation();

    return (
        <HStack
            justify="center"
            max
        >
            <Text
                variant="error"
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align="center"
            />
        </HStack>
    );
};

export const ProfileCardRedesignedSkeleton = () => (
    <Card
        padding="24"
        border='partial'
        max
    >
        <VStack gap="32">
            <HStack
                max
                justify="center"
            >
                <Skeleton
                    border="100%"
                    width={128}
                    height={128}
                />
            </HStack>
            <HStack
                gap="32"
                max
            >
                <VStack
                    gap="16"
                    max
                >
                    <Skeleton
                        width="100%"
                        height={38}
                    />
                    <Skeleton
                        width="100%"
                        height={38}
                    />
                    <Skeleton
                        width="100%"
                        height={38}
                    />
                    <Skeleton
                        width="100%"
                        height={38}
                    />
                    <Skeleton
                        width="100%"
                        height={38}
                    />
                    <Skeleton
                        width="100%"
                        height={38}
                    />
                    <Skeleton
                        width="100%"
                        height={38}
                    />
                    <Skeleton
                        width="100%"
                        height={38}
                    />
                </VStack>
            </HStack>
        </VStack>
    </Card>
);

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
    const { className, data, readonly, onChangeProfileInfo } = props;
    const { t } = useTranslation('profile');

    return (
        <Card
            padding="24"
            border='partial'
            max
            className={className}
        >
            <VStack gap="32">
                {data?.avatar && (
                    <HStack
                        justify="center"
                        max
                    >
                        <Avatar
                            size={128}
                            src={data?.avatar}
                        />
                    </HStack>
                )}
                <HStack
                    gap="24"
                    max
                >
                    <VStack
                        gap="16"
                        max
                    >
                        <Input
                            value={data?.firstName}
                            label={t('Имя')}
                            onChange={(value) =>
                                onChangeProfileInfo('firstName', value)
                            }
                            readonly={readonly}
                            data-testid="ProfileCard.firstName"
                        />
                        <Input
                            readonly={readonly}
                            value={data?.lastName}
                            label={t('Фамилия')}
                            onChange={(value) =>
                                onChangeProfileInfo('lastName', value)
                            }
                            data-testid="ProfileCard.LastName"
                        />
                        <Input
                            readonly={readonly}
                            value={data?.age}
                            label={t('Возраст')}
                            onChange={(value) =>
                                onChangeProfileInfo('age', value)
                            }
                            data-testid="ProfileCard.Age"
                        />
                        <Input
                            readonly={readonly}
                            value={data?.city}
                            label={t('Город')}
                            onChange={(value) =>
                                onChangeProfileInfo('city', value)
                            }
                            data-testid="ProfileCard.City"
                        />
                        <Input
                            readonly={readonly}
                            value={data?.username}
                            label={t('Имя пользователя')}
                            onChange={(value) =>
                                onChangeProfileInfo('username', value)
                            }
                            data-testid="ProfileCard.UserName"
                        />
                        <Input
                            readonly={readonly}
                            value={data?.avatar}
                            label={t('Ссылка на аватар')}
                            onChange={(value) =>
                                onChangeProfileInfo('avatar', value)
                            }
                            data-testid="ProfileCard.Avatar"
                        />
                        <CurrencySelect
                            value={data?.currency}
                            onChange={(value) =>
                                onChangeProfileInfo('currency', value)
                            }
                            readonly={readonly}
                            data-testid="ProfileCard.Currency"
                        />
                        <CountrySelect
                            value={data?.country}
                            onChange={(value) =>
                                onChangeProfileInfo('country', value)
                            }
                            readonly={readonly}
                            data-testid="ProfileCard.Country"
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
});
