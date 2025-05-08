"use client";

import React from 'react';
import ProjectsMainPage from '@/components/projects/ProjectsMainPage';
import MainFrameComponent from '@/components/MainFrameComponent';
import { mainFrameIcons } from '@/data/MainFrameIcons';

const Projects = () => {

    return (
        <>
            <MainFrameComponent {...mainFrameIcons["projects"]} >
                <ProjectsMainPage />
            </MainFrameComponent>
        </>
    );
};

export default Projects; 