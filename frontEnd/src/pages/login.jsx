import React, { useState, useContext } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom' 
import { userContext } from '../context/authContext'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate(); 
    const { login } = useContext(userContext);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");

        if (!email.trim() || !password.trim()) {
            Swal.fire({
                title: 'Validation Error',
                text: 'Please fill in all fields!',
                icon: 'warning',
                confirmButtonColor: '#4f46e5'
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            if (response.data.success) {
                sessionStorage.setItem('token', response.data.token);
                login(response.data.user);

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome back, ${response.data.user.name}! 🎉`,
                    timer: 1500,
                    showConfirmButton: false,
                });

                if (response.data.user.role === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/employee-dashboard');
                }
            }

        } catch (error) {
            const errMsg = error.response?.data?.message || "Cannot connect to server. Is Backend running?";
            
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: errMsg,
                confirmButtonColor: '#ef4444'
            });

            setError(errMsg);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] from-50% to-[#f8fafc] to-50% px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100 transition-all duration-300">
                
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                        Employee Management System
                    </h2>
                    <p className="text-slate-500 text-sm mt-2">Welcome! Please enter your details.</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-xl text-sm mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="Email" className="block text-sm font-semibold text-slate-700 mb-2">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            id="Email" 
                            name="Email" 
                            placeholder="Please Enter Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                id="password" 
                                name="password" 
                                placeholder="************" 
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm pt-1">
                        <label className="flex items-center cursor-pointer select-none">
                            <input 
                                type="checkbox" 
                                id="rememberMe" 
                                name="rememberMe" 
                                className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
                            />
                            <span className="ml-2 text-slate-600 font-medium">Remember Me</span>
                        </label>
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">
                            Forgot Password?
                        </a>
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit" 
                            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl shadow-lg shadow-indigo-100 hover:shadow-xl hover:shadow-indigo-200 transition-all duration-200 transform active:scale-[0.98]"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;