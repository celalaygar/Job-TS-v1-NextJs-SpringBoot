"use client";

import React from 'react';
import MainFrameComponent from '@/components/MainFrameComponent';
import BacklogMainPage from '@/components/backlog/BacklogMainPage';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { mainFrameIcons } from '@/data/MainFrameIcons';

const BacklogPage = () => {

    const selectedProject = useSelector(
        (state: RootState) => state.project.selectedProject
    );

    return (
        <>
            <MainFrameComponent {...mainFrameIcons["backlog"]} >
                <BacklogMainPage projectId={selectedProject?.projectId} />
            </MainFrameComponent>
        </>
    );
};

export default BacklogPage; 