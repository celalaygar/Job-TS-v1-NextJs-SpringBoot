"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ACTIVE_TAB } from "@/data/constant";
import { Badge, LinearProgress, Popover } from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import RequestsPopover from "./RequestsPopover";
import MessagesPopover from "./MessagesPopover";
import NotificationsPopover from "./NotificationsPopover";
import { Invite } from "@/data/invite";
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationMainPopover: React.FC = ({ }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("requests");
  const [invitationCount, setInvitationCount] = useState<number>(0);
  const [loadingInvites, setLoadingInvites] = useState<boolean>(false);
  const [invitations, setInvitations] = useState<Invite[] | null>([]);

  const fetchData = async (
    url: string,
    setData: React.Dispatch<React.SetStateAction<Invite[] | null>>,
    setDataCount: React.Dispatch<React.SetStateAction<number>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setData(null);
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setData(data.data);
      setDataCount(data.data.length || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInvites = useCallback(async () => {
    await fetchData(`/api/invitation/user/pendingInvites`, setInvitations, setInvitationCount, setLoadingInvites);
  }, []);

  useEffect(() => {
    fetchUserInvites();
  }, [fetchUserInvites]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button onClick={handlePopoverOpen} className="relative border border-1 shadow-md p-2">
        {invitationCount > 0 ?
          <Badge badgeContent={invitationCount} color="error">
            <NotificationsIcon className="text-gray-600" />
          </Badge>
          :
          <NotificationsNoneIcon className="w-6 h-6 text-black cursor-pointer" />}
      </button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="w-[300px] sm:w-[400px] md:w-[350px] lg:w-[400px] xl:w-[500px] p-4">
          {/* Tab Menu */}
          <div className="flex flex-col sm:flex-row border-b sm:border-none">
            <button
              onClick={() => setActiveTab(ACTIVE_TAB.requests)}
              className={`flex-1 py-2 text-sm ${activeTab === ACTIVE_TAB.requests ? "border-b-2 border-blue-500 font-bold" : ""}`}
            >
              Invitations
            </button>
            <button
              onClick={() => setActiveTab(ACTIVE_TAB.notifications)}
              className={`flex-1 py-2 text-sm ${activeTab === ACTIVE_TAB.notifications ? "border-b-2 border-blue-500 font-bold" : ""}`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab(ACTIVE_TAB.messages)}
              className={`flex-1 py-2 text-sm ${activeTab === ACTIVE_TAB.messages ? "border-b-2 border-blue-500 font-bold" : ""}`}
            >
              Messages
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4 space-y-2 p-2">
            {activeTab === ACTIVE_TAB.requests &&
              <>
                {loadingInvites ?
                  <LinearProgress /> :
                  <RequestsPopover invitations={invitations} loadUserInvites={fetchUserInvites} />
                }
              </>
            }
            {activeTab === ACTIVE_TAB.notifications &&
              <>
                <NotificationsPopover notifications={[]} />
              </>
            }
            {activeTab === ACTIVE_TAB.messages &&
              <>
                <MessagesPopover messages={[]} />
              </>
            }
          </div>
        </div>
      </Popover>
    </>
  );
};

export default NotificationMainPopover;
