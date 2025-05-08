"use client";

import React, { SetStateAction, useState } from "react";
import { TextField, SelectChangeEvent, Alert } from "@mui/material";
import { RegisterErrorForm, RegisterUser } from "@/data/users";
import Toastyf from "./Toastyf";

const Register = () => {
    const [registerForm, setRegisterForm] = useState<RegisterUser>({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        birthdate: "",
    });
    const [resultMessage, setResultMessage] = useState<string | undefined>();


    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<RegisterErrorForm>({});
    const clearForm = () => {
        setRegisterForm({
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            birthdate: "",
        })
    };

    // Form değişikliklerini işleyelim
    const onchange = (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
            | SelectChangeEvent<string>
    ) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value,
        });

        // Hata varsa, alan değiştiğinde temizleyelim
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    // Validasyon Fonksiyonu
    const validateForm = () => {
        const tempErrors: RegisterErrorForm = {};
        let isValid = true;

        if (!registerForm.email) {
            tempErrors.email = "Email zorunludur.";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
            tempErrors.email = "Geçerli bir email adresi giriniz.";
            isValid = false;
        }

        if (!registerForm.password) {
            tempErrors.password = "Şifre zorunludur.";
            isValid = false;
        } else if (registerForm.password.length < 6) {
            tempErrors.password = "Şifre en az 6 karakter olmalıdır.";
            isValid = false;
        }

        if (!registerForm.firstname) {
            tempErrors.firstname = "Ad zorunludur.";
            isValid = false;
        }

        if (!registerForm.lastname) {
            tempErrors.lastname = "Soyad zorunludur.";
            isValid = false;
        }

        if (!registerForm.birthdate) {
            tempErrors.birthdate = "Doğum tarihi zorunludur.";
            isValid = false;
        } else {
            const birthDate = new Date(registerForm.birthdate);
            if (isNaN(birthDate.getTime())) {
                tempErrors.birthdate = "Geçerli bir doğum tarihi giriniz.";
                isValid = false;
            }
        }

        setErrors(tempErrors);
        return isValid;
    };

    // Kayıt Butonu İşlemi
    const handleRegister = async () => {
        if (!validateForm()) return;

        setResultMessage(undefined)
        setLoading(true);
        try {
            // API isteği veya kayıt işlemi buraya eklenebilir
            console.log("Kayıt başarılı", registerForm);
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerForm),
            });
            if (!res.ok) {
                throw new Error("Failed to Register User");
            }
            clearForm();
            setResultMessage("User Registered")
        } catch (error) {
            console.error("User Register error:", error);
        }
        setLoading(false);
    };

    return (<>
        {resultMessage && <>
            <Toastyf
                newVertical={'bottom'}
                newHorizontal={'right'}
                message={resultMessage}
                setResultMessage={
                    (newValues) => setResultMessage(newValues as SetStateAction<string | undefined>)}
            />
            <Alert severity="info" onClose={() => setResultMessage(undefined)}>
                {resultMessage}
            </Alert>
        </>}
        <div className="w-full max-w-lg mx-auto shadow-lg border p-2">
            <TextField
                label="Email"
                type="email"
                name="email"
                fullWidth
                margin="normal"
                value={registerForm.email}
                onChange={onchange}
                size="small"
                error={Boolean(errors.email)}
                helperText={errors.email}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                fullWidth
                margin="normal"
                value={registerForm.password}
                onChange={onchange}
                size="small"
                error={Boolean(errors.password)}
                helperText={errors.password}
            />
            <TextField
                label="First Name"
                fullWidth
                name="firstname"
                margin="normal"
                value={registerForm.firstname}
                onChange={onchange}
                size="small"
                error={Boolean(errors.firstname)}
                helperText={errors.firstname}
            />
            <TextField
                label="Last Name"
                name="lastname"
                fullWidth
                margin="normal"
                value={registerForm.lastname}
                onChange={onchange}
                size="small"
                error={Boolean(errors.lastname)}
                helperText={errors.lastname}
            />
            <TextField
                label="Birth Date"
                type="date"
                name="birthdate"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={registerForm.birthdate}
                onChange={onchange}
                size="small"
                error={Boolean(errors.birthdate)}
                helperText={errors.birthdate}
            />
            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleRegister}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                >
                    Register
                </button>
            </div>
        </div>
    </>
    );
};

export default Register;
