"use client";

import React from "react";
import MainFrameComponent from "@/components/MainFrameComponent";
import TaskMainPage from "@/components/tasks/TaskMainPage";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { mainFrameIcons } from "@/data/MainFrameIcons";

const TasksPage = () => {
    const selectedProject = useSelector(
        (state: RootState) => state.project.selectedProject
    );


    return (
        <>
            <MainFrameComponent {...mainFrameIcons["tasks"]} >
                <TaskMainPage projectId={selectedProject?.projectId} />
            </MainFrameComponent>
        </>
    );
};

export default TasksPage;
