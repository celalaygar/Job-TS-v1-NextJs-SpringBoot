"use client";

import {
  Alert,
  Avatar,
  Box,
  Button,
  LinearProgress,
  Stack,
} from "@mui/material";
import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import "moment/locale/tr";
import Moment from "../Moment";
import { Project, ProjectUser } from "@/data/project";
import Toastyf from "../Toastyf";
import TaskListPage from "../tasks/TaskListPage";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import InviteUserDialog from "./InviteUserDialog"; // Import the new dialog component

type MainFrameProps = {
  projectId: string;
};

const ProjectsDetailMainPage: React.FC<MainFrameProps> = ({ projectId }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDialog, setLoadingDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState<ProjectUser[] | null>(null);
  const [InvitationMail, setInvitationMail] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [resultMessage, setResultMessage] = useState<string | undefined>();

  const openDialog = () => {
    getusersNotContainingProject();
    setOpen(true);
  };

  const fetchUsers = async (
    url: string,
    setData: React.Dispatch<React.SetStateAction<ProjectUser[] | null>>,
    preLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    preLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      preLoading(false);
    }
  };

  const fetchProject = async (
    url: string,
    setData: React.Dispatch<React.SetStateAction<Project | null>>,
    preLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    preLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      preLoading(false);
    }
  };

  const loadDetail = useCallback(async () => {
    if (!projectId) return;
    await fetchProject(`/api/jobs/projects/${projectId}`, setProject, setLoading);
  }, [projectId]);

  const getusersNotContainingProject = useCallback(async () => {
    if (!projectId) return;
    await fetchUsers(`/api/jobs/projects/${projectId}/getUsersNotContainingProject`, setUsers, setLoadingDialog);
  }, [projectId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  const handleInvite = async () => {
    setResultMessage(undefined);
    try {
      const res = await fetch(`/api/invitation/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          projectId: projectId,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to invite user");
      }
      const data = await res.json();
      setResultMessage(data.value);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInvitationMail = async () => {
    setResultMessage(undefined);
    try {
      const res = await fetch(`/api/invitation/sendMail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: InvitationMail,
          projectId: projectId,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to send invitation mail");
      }
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
    setResultMessage("Invitation mail sent to " + InvitationMail);
  };

  return !projectId ? (
    <Alert severity="error">Please select a project</Alert>
  ) : loading ? (
    <LinearProgress />
  ) : (
    <>
      <div className="container mx-auto p-2 md:p-2 space-y-2">
        {resultMessage && (
          <>
            <Toastyf
              newVertical={"bottom"}
              newHorizontal={"right"}
              message={resultMessage}
              setResultMessage={(newValues) => setResultMessage(newValues as SetStateAction<string | undefined>)}
            />
            <Alert severity="warning" onClose={() => setResultMessage(undefined)}>
              {resultMessage}
            </Alert>
          </>
        )}

        <div className="bg-white shadow-md rounded-lg mt-5 p-2 xl:p-6">
          <div className="flex flex-col xl:flex-row items-center justify-between mb-4 ">
            <h4 className="text-lg font-bold text-left flex-grow xl:my-4">
              <strong>Project: </strong> {project?.name}
            </h4>
            <Button variant="outlined" startIcon={<PersonAddAltOutlinedIcon />} onClick={openDialog}>Invite User</Button>
          </div>
          <Box sx={{ display: "flex", overflowX: "auto", gap: 2, pb: 2 }}>
            {project?.participatingUsers.map((user) => (
              <Stack key={user.id} alignItems="center">
                <Avatar sx={{ width: 50, height: 50 }}>
                  {(user.firstname + " " + user.lastname)
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
                <div className="text-xs">{user.firstname}<br />{user.lastname}</div>
              </Stack>
            ))}
          </Box>
        </div>

        <div className="flex flex-col xl:flex-row mt-5 border border-1border-gray-300 shadow-md xl:items-end p-4 xl:p-4 xl:space-y-0 xl:space-x-6">
          <div className="xl:w-7/12">
            <div className="text-sm p-1">
              <strong>Project Name: </strong> {project?.name}
            </div>
            <div className="text-sm p-1">
              <strong>Project No: </strong> {project?.projectCode}
            </div>
          </div>
          <div className="xl:w-5/12 flex flex-col items-start xl:items-end xl:p-2 xl:space-y-0 xl:space-x-6">
            <div className="text-sm p-1">
              <strong>Oluşturan:</strong> {project?.createdBy?.email}
            </div>
            <div className="text-sm p-1">
              <strong>Oluşturulma Tarihi:</strong> <Moment date={project?.createdAt} />
            </div>
          </div>
        </div>

        <div className="border p-4 rounded-lg shadow-md bg-white mt-4 p-4">
          <p className="p-2 whitespace-pre-line text-sm bg-gray-100 p-3 rounded-lg">
            <strong>Description : </strong>{project?.description}</p>
        </div>


        <div className="space-y-4 mt-5">
          <TaskListPage tasks={project?.tasks} title="Tasks" />
        </div>
      </div>

      <InviteUserDialog
        open={open}
        setOpen={setOpen}
        projectId={projectId}
        handleInvite={handleInvite}
        handleInvitationMail={handleInvitationMail}
        users={users}
        loadingDialog={loadingDialog}
        userId={userId}
        setUserId={setUserId}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        InvitationMail={InvitationMail}
        setInvitationMail={setInvitationMail}
      />
    </>
  );
};

export default ProjectsDetailMainPage;
