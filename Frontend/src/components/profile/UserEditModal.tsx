
import { ExtendedUser } from "@/data/users";
import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

interface UserEditModalProps {
    open: boolean;
    onClose: () => void;
    userData: ExtendedUser;
    onSave: (data: ExtendedUser) => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ open, onClose, userData, onSave }) => {
    const [formData, setFormData] = useState<ExtendedUser>(userData);

    // Eğer userData değişirse formData'yı güncelle
    useEffect(() => {
        setFormData(userData);
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <h5 className="my-5 w-full text-center font-semibold">UPDATE YOUR USER INFORMATION</h5>
            <DialogContent className="space-y-4">
                <TextField label="Ad" name="firstname" fullWidth value={formData.firstname || ""} onChange={handleChange} />
                <TextField label="Soyad" name="lastname" fullWidth value={formData.lastname || ""} onChange={handleChange} />
                <TextField label="E-posta" name="email" type="email" fullWidth value={formData.email || ""} onChange={handleChange} />
                <TextField label="Doğum Tarihi" name="birthdate" type="date" fullWidth value={formData.birthdate || ""} onChange={handleChange} />
                <TextField label="Doğum Şehri" name="birthcity" fullWidth value={formData.birthcity || ""} onChange={handleChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>İptal</Button>
                <Button variant="contained" color="primary" onClick={() => onSave(formData)}>Kaydet</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserEditModal;
