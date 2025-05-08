

import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Popover } from '@mui/material';
import { useSession } from 'next-auth/react';
import { ExtendedUser } from '@/data/users';
import Moment from '../Moment';

const AccountPopover = () => {

    const { data: session } = useSession();
    const selectedUser: ExtendedUser = session?.user || {};

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "user-popover" : undefined;
    return (
        <>
            <button onClick={handleUserClick} className="p-2 border border-1 shadow-md">
                <AccountCircleIcon className="w-6 h-6 text-black cursor-pointer" />
            </button>


            {/* Kullanıcı Popover */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <div className=" p-4 w-full max-w-lg mx-auto">
                    <h3 className="text-xl font-bold mb-4 text-center">My Account</h3>
                    <div className="w-full p-2">
                        {selectedUser ? (
                            <div className="space-y-2">
                                <p>
                                    <strong>Name:</strong> {selectedUser.firstname} {selectedUser.lastname}
                                </p>
                                <p>
                                    <strong>Email:</strong> {selectedUser.email}
                                </p>
                                <p>
                                    <strong>Role:</strong> {selectedUser.role}
                                </p>
                                <p>
                                    <strong>Birth City:</strong> {selectedUser.birthcity}
                                </p>
                                <p>
                                    <strong>Birth Date:</strong> <Moment date={selectedUser.birthdate} />
                                </p>
                            </div>
                        ) : (
                            <p>Loading user details...</p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end  gap-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Popover>
        </>
    );
};

export default AccountPopover;