import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';

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

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: MainIcon,
            text: 'Главная',
        },
        {
            path: getRouteAbout(),
            Icon: AboutIcon,
            text: 'О сайте',
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: ProfileIcon,
                text: 'Профиль',
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                Icon: ArticleIcon,
                text: 'Статьи',
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
});
