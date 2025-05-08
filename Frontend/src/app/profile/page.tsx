"use client";

import React from 'react';
import MainFrameComponent from '@/components/MainFrameComponent';
import MyProfileMainPage from '@/components/profile/MyProfileMainPage';

import { mainFrameIcons } from '@/data/MainFrameIcons';

const ProfilePage = () => {


    return (
        <>
            <MainFrameComponent {...mainFrameIcons["profile"]}>
                <MyProfileMainPage />
            </MainFrameComponent>
        </>
    );
};

export default ProfilePage; 