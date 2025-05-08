"use client";

import React from "react";
import { useParams } from "next/navigation";
import MainFrameComponent from "@/components/MainFrameComponent";
import TaskDetailMainPage from "@/components/tasks/TaskDetailMainPage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { mainFrameIcons } from "@/data/MainFrameIcons";

const TaskDetailPage = () => {
  const selectedProject = useSelector(
    (state: RootState) => state.project.selectedProject
  );

  const { taskId } = useParams();

  // Ensure taskId is defined before proceeding
  if (!taskId) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <>
      <MainFrameComponent {...mainFrameIcons["tasks"]}>
        {<TaskDetailMainPage taskId={String(taskId)} projectId={selectedProject?.projectId} />}
      </MainFrameComponent>
    </>
  );
};

export default TaskDetailPage;
