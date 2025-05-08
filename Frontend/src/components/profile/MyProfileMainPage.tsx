"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "@mui/material";
import UserEditModal from "./UserEditModal";
import PasswordChangeModal from "./PasswordChangeModal";
import { ExtendedUser, PasswordUpdateForm } from "@/data/users";



const MyProfileMainPage: React.FC = () => {
    const { data: session } = useSession();


    const user: ExtendedUser = session?.user || {};

    // Modal state
    const [openEdit, setOpenEdit] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);

    const handleSaveUser = (data: ExtendedUser) => {
        console.log("Updated User Data:", data);
        setOpenEdit(false);
    };

    const handleSavePassword = (data: PasswordUpdateForm) => {
        console.log("Updated Password Data:", data);
        setOpenPassword(false);
    };

    return (
        <>
            <div className="justify-center items-center  bg-white p-2 rounded-lg border border-1 shadow-lg max-w-md w-full ">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Profil Bilgileri</h2>
                {session ? (
                    <div className="space-y-4">
                        <div className="border p-2 rounded-md">
                            <p className="font-semibold">Ad: <span className="text-gray-600">{user?.firstname || "Belirtilmemiş"}</span></p>
                        </div>
                        <div className="border p-2 rounded-md">
                            <p className="font-semibold">Soyad: <span className="text-gray-600">{user?.lastname || "Belirtilmemiş"}</span></p>
                        </div>
                        <div className="border p-2 rounded-md">
                            <p className="font-semibold">E-posta: <span className="text-gray-600">{user.email || "Belirtilmemiş"}</span></p>
                        </div>
                        <div className="border p-2 rounded-md">
                            <p className="font-semibold">Rol: <span className="text-gray-600">{user.role || "Belirtilmemiş"}</span></p>
                        </div>
                        <div className="border p-2 rounded-md">
                            <p className="font-semibold">Doğum Tarihi: <span className="text-gray-600">{user.birthdate || "Belirtilmemiş"}</span></p>
                        </div>
                        <div className="border p-2 rounded-md">
                            <p className="font-semibold">Doğum Şehri: <span className="text-gray-600">{user.birthcity || "Belirtilmemiş"}</span></p>
                        </div>

                        <div className="flex justify-between mt-6">
                            <Button variant="contained" color="primary" onClick={() => setOpenEdit(true)}>
                                Bilgileri Güncelle
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => setOpenPassword(true)}>
                                Şifre Değiştir
                            </Button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Kullanıcı bilgileri mevcut değil.</p>
                )}
            </div>

            {/* Modals */}
            <UserEditModal open={openEdit} onClose={() => setOpenEdit(false)} userData={user} onSave={handleSaveUser} />
            <PasswordChangeModal open={openPassword} onClose={() => setOpenPassword(false)} onSave={handleSavePassword} />
        </>
    );
};

export default MyProfileMainPage;
