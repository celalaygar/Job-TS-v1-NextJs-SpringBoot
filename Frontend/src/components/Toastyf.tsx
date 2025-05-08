import React from "react";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface ToastyfProps {
    newVertical: "top" | "bottom";
    newHorizontal: "left" | "center" | "right";
    message: string | undefined;
    setResultMessage: (newValues: string) => void;
}


const Toastyf: React.FC<ToastyfProps> = ({ newVertical, newHorizontal, message, setResultMessage }) => {

    const [open, setOpen] = React.useState(true);


    const handleClose = () => {
        setOpen(false);
    };
    const handleExited = () => {
        setResultMessage("");
    };
    return (
        message ?
            <>
                <Snackbar
                    anchorOrigin={{ vertical: newVertical, horizontal: newHorizontal }}
                    key={message ? message : undefined}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    TransitionProps={{ onExited: handleExited }}
                    message={message ? message : ""}
                    action={
                        <React.Fragment>
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                sx={{ p: 0.5 }}
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </>
            :
            null

    );
};

export default Toastyf;
