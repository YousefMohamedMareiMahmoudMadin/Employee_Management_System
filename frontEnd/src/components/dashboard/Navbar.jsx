import React from "react";
import { useAuth } from "../../context/authContext.jsx";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="flex items-center justify-between p-4 bg-slate-800 text-white">
            <div>
                <span className="font-bold">Employee Management System</span>
            </div>
            <div className="flex items-center gap-4">
                <span>Welcome, {user?.name || "User"}</span>
                <button 
                    onClick={logout}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg text-sm font-semibold transition-colors"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;