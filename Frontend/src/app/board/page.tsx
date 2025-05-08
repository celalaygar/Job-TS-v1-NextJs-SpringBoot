"use client";



import BoardMainPage from "@/components/board/BoardMainPage";
import MainFrameComponent from "@/components/MainFrameComponent";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { mainFrameIcons } from "@/data/MainFrameIcons";

export default function BoardPage() {
  const selectedProject = useSelector(
    (state: RootState) => state.project.selectedProject
  );

  return (
    <MainFrameComponent {...mainFrameIcons["board"]} >
      <BoardMainPage projectId={selectedProject?.projectId} />
    </MainFrameComponent>
  );
}
