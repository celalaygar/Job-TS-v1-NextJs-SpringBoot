"use client";

import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    Tab,
    Tabs,
    TextField,
} from "@mui/material";
import { ProjectUser } from "@/data/project";

type InviteUserDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    projectId: string;
    handleInvite: () => void;
    handleInvitationMail: () => void;
    users: ProjectUser[] | null;
    loadingDialog: boolean;
    userId: string;
    setUserId: (userId: string) => void;
    tabIndex: number;
    setTabIndex: (tabIndex: number) => void;
    InvitationMail: string;
    setInvitationMail: (email: string) => void;
};

const InviteUserDialog: React.FC<InviteUserDialogProps> = ({
    open,
    setOpen,
    handleInvite,
    handleInvitationMail,
    users,
    loadingDialog,
    userId,
    setUserId,
    tabIndex,
    setTabIndex,
    InvitationMail,
    setInvitationMail,
}) => {
    const handleClose = () => {
        setUserId("");
        setInvitationMail("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Invite User</DialogTitle>
            <Tabs value={tabIndex} onChange={(_, newValue) => setTabIndex(newValue)} centered>
                <Tab label="Select User" />
                <Tab label="Send Invitation" />
            </Tabs>
            <DialogContent>
                {tabIndex === 0 ? (
                    <>
                        <DialogContentText>Select a user to invite to the project.</DialogContentText>
                        {loadingDialog ? (
                            <LinearProgress />
                        ) : (
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="select-user-label">Users</InputLabel>
                                <Select
                                    labelId="select-user-label"
                                    id="select-user"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                >
                                    {users &&
                                        users.map((user: ProjectUser) => (
                                            <MenuItem key={user.id} value={user.id}>
                                                {user.email} - {user.firstname} {user.lastname}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        )}
                    </>
                ) : (
                    <>
                        <DialogContentText>Enter an email to send an invitation.</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="invitationMail"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={InvitationMail}
                            onChange={(e) => setInvitationMail(e.target.value)}
                        />
                    </>
                )}
            </DialogContent>
            <div className="flex flex-col sm:flex-row justify-end mt-5 gap-2 p-2">
                <button
                    type="button"
                    disabled={loadingDialog}
                    onClick={handleClose}
                    className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
                >
                    Cancel
                </button>
                {tabIndex === 0 ? (
                    <button
                        type="button"
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                        onClick={handleInvite}
                        disabled={!userId}
                    >
                        Invite
                    </button>
                ) : (
                    <button
                        type="button"
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                        onClick={handleInvitationMail}
                        disabled={!InvitationMail}
                    >
                        Send Invitation
                    </button>
                )}
            </div>
        </Dialog>
    );
};

export default InviteUserDialog;
