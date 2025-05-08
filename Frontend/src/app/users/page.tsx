"use client";

import React from 'react';
import MainFrameComponent from '@/components/MainFrameComponent';
import UsersMainPage from '@/components/users/UsersMainPage';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { mainFrameIcons } from '@/data/MainFrameIcons';

const UsersPage = () => {
    const selectedProject = useSelector(
        (state: RootState) => state.project.selectedProject
    );



    return (
        <>
            <MainFrameComponent {...mainFrameIcons["users"]} >
                <UsersMainPage projectId={selectedProject?.projectId} />
            </MainFrameComponent>
        </>
    );
};

export default UsersPage; 