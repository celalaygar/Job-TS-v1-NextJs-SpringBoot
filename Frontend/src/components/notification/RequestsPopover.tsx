"use client";

import { Invite } from "@/data/invite";
import React, { SetStateAction, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  Alert,
  Badge, Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, LinearProgress
} from "@mui/material"; // Import Badge component for the notification count
import Toastyf from "../Toastyf";

type MainFrameProps = {
  invitations?: Invite[] | null;
  loadUserInvites?: () => void;
};

const RequestsPopover: React.FC<MainFrameProps> = ({ invitations, loadUserInvites }) => {
  const invitationCount = invitations?.length || 0;
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedInvite, setSelectedInvite] = React.useState<Invite | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [resultMessage, setResultMessage] = useState<string | undefined>();

  const openDialogHandler = (invite: Invite) => {
    setSelectedInvite(invite);
    setOpenDialog(true);
  }
  const closeDialogHandler = () => {
    setOpenDialog(false);
  }

  const acceptInviteHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/invitation/accept`, {
        method: 'POST',
        body: JSON.stringify({ inviteId: selectedInvite?.id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error("Failed to accept invitation");
      }
      const data = await res.json();
      setResultMessage(data.resultCodeValue);
    } catch (error) {
      console.error("Error accepting invitation:", error);
    } finally {
      setLoading(false);
    }
    await loadUserInvites?.();
    closeDialogHandler();
  }

  const rejectInviteHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/invitation/decline`, {
        method: 'POST',
        body: JSON.stringify({ inviteId: selectedInvite?.id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error("Failed to accept invitation");
      }
      const data = await res.json();
      setResultMessage(data.resultCodeValue);
    } catch (error) {
      console.error("Error accepting invitation:", error);
    } finally {
      setLoading(false);
    }
    await loadUserInvites?.();
    closeDialogHandler();
  }


  return (loading ? (<> <LinearProgress /> </>) :
    <>
      <Toastyf
        newVertical={'bottom'}
        newHorizontal={'right'}
        message={resultMessage}
        setResultMessage={
          (newValues) => setResultMessage(newValues as SetStateAction<string | undefined>)}
      />
      <div className="flex items-center text-gray-600">
        <Badge badgeContent={invitationCount} color="error">
          <NotificationsIcon className="text-gray-600" />
        </Badge>
        <span className="ml-5">Invitations</span>
      </div>
      {invitations && invitations.length > 0 ? (
        invitations?.map((invite) => (
          <div
            className="text-gray-600 border-b-2 border-gray-200 p-2 hover:bg-gray-100 cursor-pointer transition duration-200 mt-2 text-sm"
            key={invite.id}
            onClick={() => openDialogHandler(invite)}
          >
            You are invited to join the project <strong>{invite?.project.name}</strong> by <strong>{invite?.invitingUser.email}</strong>.
          </div>

        ))
      ) : (
        <Alert severity="info">No Invitations found</Alert>
      )}
      <Dialog
        open={openDialog}
        onClose={closeDialogHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Project invitation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are invited to join the project <strong>{selectedInvite?.project.name}</strong> by <strong>{selectedInvite?.invitingUser.email}</strong>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={acceptInviteHandler} color="primary">
            Accept
          </Button>
          <Button onClick={rejectInviteHandler} color="error" autoFocus>
            Decline
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RequestsPopover;
