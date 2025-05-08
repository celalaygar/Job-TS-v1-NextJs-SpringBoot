"use client";

import React from 'react';
import MainFrameComponent from '@/components/MainFrameComponent';
import SprintMainPage from '@/components/sprint/SprintMainPage';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { mainFrameIcons } from '@/data/MainFrameIcons';

const SprintsPage = () => {
    const selectedProject = useSelector(
        (state: RootState) => state.project.selectedProject
    );

    return (
        <>
            <MainFrameComponent {...mainFrameIcons["sprints"]}>
                <>
                    <SprintMainPage projectId={selectedProject?.projectId} />
                </>
            </MainFrameComponent>
        </>
    );
};

export default SprintsPage; 