"use client";


import { Alert, Badge } from "@mui/material";
import React from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';


type MainFrameProps = {
  messages?: [];
};

const MessagesPopover: React.FC<MainFrameProps> = ({ messages }) => {
  const messagesCount = messages?.length || 0;


  return (
    <>
      <div className="flex items-center text-gray-600">
        <Badge badgeContent={messagesCount} color="error">
          <NotificationsIcon className="text-gray-600" />
        </Badge>
        <span className="ml-5">Messages</span>
      </div>
      {messages && messages.length > 0 ? (messages?.map((data) => (
        <div
          className="text-gray-600 border-b-2 border-gray-200 p-2 hover:bg-gray-100 cursor-pointer transition duration-200 mt-2"
          key={data}>
          {data}
        </div>
      ))
      ) : (
        <Alert severity="info">No Messages found</Alert>
      )}
    </>
  );
};

export default MessagesPopover;
