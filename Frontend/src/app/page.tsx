"use client";

import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const HomePage = () => {
    const [value, setValue] = useState(0);

    return (
        <div className="flex flex-col items-center w-full" style={{ backgroundColor: "#ffffff", color: "#111111" }}>
            <div className="flex space-x-4 border-b border-gray-300 mt-6">
                <button
                    className={`px-4 py-2 font-medium ${value === 0
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                        }`}
                    onClick={() => setValue(0)}
                >
                    Giriş
                </button>
                <button
                    className={`px-4 py-2 font-medium ${value === 1
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                        }`}
                    onClick={() => setValue(1)}
                >
                    Kayıt Ol
                </button>
            </div>
            <div className="mt-6 w-full max-w-md">
                {value === 0 && <Login />}
                {value === 1 && <Register />}
            </div>
        </div>
    );
};

export default HomePage;
