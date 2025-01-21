import React, { useState } from 'react'
import { showSuccessToast, showErrorToast } from '../../utils/toastConfig'

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()
        try {
            const loginSuccess = handleLogin(email, password)

            if (loginSuccess) {
                const isAdmin = email === "admin@me.com"
                showSuccessToast(isAdmin ? 'Welcome, Admin! 👋' : 'Successfully logged in!')
                setEmail("")
                setPassword("")
            } else {
                showErrorToast('Invalid credentials. Please try again.')
            }
        } catch (error) {
            showErrorToast('Login failed. Please check your credentials.')
        }
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-[#0d1a26] to-[#1e2a36]">
            <div className="bg-[#1c2631] shadow-lg rounded-lg p-10 w-full max-w-sm">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h2>
                <form onSubmit={submitHandler} className="flex flex-col space-y-5">
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                        type="email"
                        placeholder="Enter your email"
                    />
                    <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-5 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                        type="password"
                        placeholder="Enter your password"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
