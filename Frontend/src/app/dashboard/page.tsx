"use client";

import React from 'react';
import DashboardMainPage from '@/components/dashboard/DashboardMainPage';
import MainFrameComponent from '@/components/MainFrameComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { mainFrameIcons } from '@/data/MainFrameIcons';


const Dashboard: React.FC = () => {
    const selectedProject = useSelector(
        (state: RootState) => state.project.selectedProject
    );


    return (
        <>
            <MainFrameComponent {...mainFrameIcons["dashBoard"]} >
                <DashboardMainPage projectId={selectedProject?.projectId} />
            </MainFrameComponent>
        </>
    );
};

export default Dashboard; 