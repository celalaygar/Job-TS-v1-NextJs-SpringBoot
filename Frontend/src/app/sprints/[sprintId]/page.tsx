"use client";

import React from "react";
import { useParams } from "next/navigation";
import MainFrameComponent from "@/components/MainFrameComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SprintDetailMainPage from "@/components/sprint/SprintDetailMainPage";
import { mainFrameIcons } from "@/data/MainFrameIcons";

const SprintsDetailPage = () => {
  const selectedProject = useSelector(
    (state: RootState) => state.project.selectedProject
  );

  const { sprintId } = useParams() as { sprintId: string };

  // Ensure taskId is defined before proceeding
  if (!sprintId || !selectedProject) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <>
      <MainFrameComponent {...mainFrameIcons["sprint"]} >
        <SprintDetailMainPage projectId={selectedProject?.projectId} sprintId={sprintId} />
      </MainFrameComponent>
    </>
  );
};

export default SprintsDetailPage;
