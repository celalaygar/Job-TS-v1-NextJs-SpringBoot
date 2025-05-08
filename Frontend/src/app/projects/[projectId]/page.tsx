"use client";

import React from "react";
import { useParams } from "next/navigation";
import MainFrameComponent from "@/components/MainFrameComponent";
import ProjectsDetailMainPage from "@/components/projects/ProjectsDetailMainPage";
import { mainFrameIcons } from "@/data/MainFrameIcons";

const ProjectDetailPage = () => {
    const { projectId } = useParams();

    // Ensure taskId is defined before proceeding
    if (!projectId) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <>
            <MainFrameComponent {...mainFrameIcons["projects"]}>
                <ProjectsDetailMainPage projectId={String(projectId)} />
            </MainFrameComponent>
        </>
    );
};

export default ProjectDetailPage;
