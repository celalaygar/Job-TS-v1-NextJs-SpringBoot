"use client";

import { ProjectUser } from "@/data/project";
import { Alert, Button, LinearProgress } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import UserDetailsDialog from "./UserDetailsDialog";

type MainFrameProps = {
  projectId: string | undefined;
};

const UsersMainPage: React.FC<MainFrameProps> = ({ projectId }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<ProjectUser[] | null>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ProjectUser | null>(null);

  const fetchUsers = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const response = await fetch("/api/jobs/projects/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.log("Error loading users", err);
    }
    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleShowClick = (user: ProjectUser) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  return !projectId ? (
    <Alert severity="error">Please select a project</Alert>
  ) : loading ? (
    <div className="w-full p-4">
      <LinearProgress />
    </div>
  ) : (
    <>
      <div className="w-full p-2">
        {users && users.length > 0 ? (
          <div className="space-y-4">
            {users.map((user: ProjectUser) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {user.firstname} {user.lastname}
                  </p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleShowClick(user)}
                >
                  Show
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <Alert severity="info">No users found</Alert>
        )}
      </div>

      {/* Pass props to UserDetailsDialog component */}
      <UserDetailsDialog
        open={openDialog}
        onClose={handleDialogClose}
        selectedUser={selectedUser}
      />
    </>
  );
};

export default UsersMainPage;
