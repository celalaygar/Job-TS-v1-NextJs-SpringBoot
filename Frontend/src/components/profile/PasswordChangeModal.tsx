import { PasswordUpdateForm } from "@/data/users";
import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import React, { useState } from "react";

interface PasswordChangeModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: PasswordUpdateForm) => void;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ open, onClose, onSave }) => {
    const [passwordData, setPasswordData] = useState<PasswordUpdateForm>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Yeni şifreler eşleşmiyor!");
            return;
        }
        onSave(passwordData);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <h5 className="my-5 w-full text-center font-semibold">UPDATE YOUR PASSWORD</h5>
            <DialogContent className="space-y-4">
                <TextField
                    label="Mevcut Şifre"
                    name="currentPassword"
                    type="password"
                    fullWidth
                    value={passwordData.currentPassword}
                    onChange={handleChange}
                />
                <TextField
                    label="Yeni Şifre"
                    name="newPassword"
                    type="password"
                    fullWidth
                    value={passwordData.newPassword}
                    onChange={handleChange}
                />
                <TextField
                    label="Yeni Şifre (Tekrar)"
                    name="confirmPassword"
                    type="password"
                    fullWidth
                    value={passwordData.confirmPassword}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>İptal</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Kaydet</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PasswordChangeModal;
