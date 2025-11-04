"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function LoginPage({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const ADMIN_PASSWORD = "ameer123"

  const handleLogin = async () => {
    setIsLoading(true)
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onLoginSuccess()
        setError("")
      } else {
        setError("Invalid password")
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <Card className="w-full max-w-md bg-white shadow-2xl border-0 relative z-10">
        <CardHeader className="space-y-4 text-center pb-8 bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-100">
          <div className="w-24 h-24 mx-auto relative">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/backup-file-78994.appspot.com/o/file_000000002274620a8bc1c942af702bb7.png?alt=media&token=4b43cfa9-7608-453d-8089-fe0e990a1e21"
              alt="Logo"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-slate-900">Admin Panel</CardTitle>
            <CardDescription className="text-slate-600 mt-2 text-sm">Secure Access Portal</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-8">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleLogin()}
              disabled={isLoading}
              className="h-12 text-base border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {error && <p className="text-red-500 text-sm font-medium animate-pulse">{error}</p>}
          </div>
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <p className="text-xs text-center text-slate-500">
            Powered by <span className="font-semibold text-slate-700">Yobe Tech Connect</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
