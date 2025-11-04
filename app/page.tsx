"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import AdminDashboard from "@/components/admin-dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (authenticated: boolean) => {
    setIsAuthenticated(authenticated)
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => handleLogin(true)} />
  }

  return <AdminDashboard onLogout={() => handleLogin(false)} />
}
