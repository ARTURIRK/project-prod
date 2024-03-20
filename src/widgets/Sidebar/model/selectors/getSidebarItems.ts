import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import MainIconDeprecated from '@/shared/assets/icons/old-main.svg';
import AboutIconDeprecated from '@/shared/assets/icons/old-about.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/old-profile.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/old-article.svg';

import MainIcon from '@/shared/assets/icons/new-home.svg';
import ArticleIcon from '@/shared/assets/icons/new-article.svg';
import AboutIcon from '@/shared/assets/icons/new-info.svg';
import ProfileIcon from '@/shared/assets/icons/new-avatar.svg';

import { SidebarItemType } from '../types/sidebar';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => MainIconDeprecated,
                on: () => MainIcon,
            }),
            text: 'Главная',
        },
        {
            path: getRouteAbout(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => AboutIconDeprecated,
                on: () => AboutIcon,
            }),
            text: 'О сайте',
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ProfileIconDeprecated,
                    on: () => ProfileIcon,
                }),
                text: 'Профиль',
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ArticleIconDeprecated,
                    on: () => ArticleIcon,
                }),
                text: 'Статьи',
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
});
