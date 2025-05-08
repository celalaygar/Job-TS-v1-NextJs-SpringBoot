"use client";

import React, { useCallback, useEffect, useState } from "react";
import { LinearProgress, Alert } from "@mui/material";
import Link from "next/link";
import { Sprint } from "@/data/sprint";
import { SprintStatusesObj } from "@/data/tasks";
import CreateSprintModal from "./CreateSprintModal";

type MainFrameProps = {
  projectId: string | undefined;
};

const SprintMainPage: React.FC<MainFrameProps> = ({ projectId }) => {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [activeSprint, setActiveSprint] = useState<Sprint | null>(null);

  const fetchSprints = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const res = await fetch("api/sprints/project/" + projectId, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch sprints");
      const data = await res.json();
      const sortedArray = data.sort((a: Sprint, b: Sprint) => {
        if (a.status === SprintStatusesObj.ACTIVE) return -1;  // ACTIVE sprint goes first
        if (b.status === SprintStatusesObj.ACTIVE) return 1;   // Put non-ACTIVE sprints after ACTIVE
        return b.id - a.id; // For non-ACTIVE sprints, sort by ID in descending order
      });

      setSprints(sortedArray);
      //setActiveSprint(sortedArray.find((sprint) => sprint.status === "ACTIVE") || null);
    } catch (error) {
      console.error("Sprint fetch error:", error);
    }
    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    fetchSprints();
  }, [fetchSprints]);

  return !projectId ? (
    <Alert severity="error">Please select a project</Alert>
  ) : loading ? (
    <LinearProgress />
  ) : (
    <div className="">
      <button
        className="bg-blue-500 my-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setOpenCreateModal(true)}
      >
        Create Sprint
      </button>

      <div className="my-5 text-bold text-lg p-2">Sprint Management</div>

      {sprints.length > 0 ? (
        <div className="flex flex-col space-y-4 p-2">
          {sprints.map((sprint) => (
            <div
              key={sprint.id}
              className={`shadow-md border border-1 rounded-lg p-2 hover:bg-gray-50 transition duration-200 w-full flex flex-col sm:flex-row sm:items-center justify-between ${sprint.status === SprintStatusesObj.ACTIVE ? "bg-green-100" : ""
                }`}
            >
              {/* Sprint Adı */}
              <h5 className="text-md font-bold w-full sm:w-1/4">{sprint.name}</h5>

              {/* Sprint Bilgileri */}
              <div className="w-full sm:w-2/4 flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600">
                <p>
                  <strong>Status:</strong> {sprint.status}
                </p>
                <p>
                  <strong>Code:</strong> {sprint.sprintCode}
                </p>
              </div>

              <div className=" flex flex-col md:flex-row md:justify-between md:items-center">
                <button className="bg-blue-500/15  hover:bg-blue-500/25  text-black px-4 py-2 text-sm mt-2 rounded-md ">
                  <Link href={`/sprints/${sprint.id}`}>
                    Show
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">Sprint not found.</p>
      )}

      <CreateSprintModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        projectId={projectId}
        refreshSprints={fetchSprints}
      />
    </div>
  );
};

export default SprintMainPage;
