import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./UsersLogin/Login/Login.jsx";
import Register from "./UsersLogin/Register/Register.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;