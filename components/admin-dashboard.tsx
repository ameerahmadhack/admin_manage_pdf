"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import UserForm from "@/components/user-form"
import UsersList from "@/components/users-list"
import Image from "next/image"

interface User {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  gender: string
  imageUrl: string | null
  createdAt: Date
  idNumber: string
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [users, setUsers] = useState<User[]>([])
  const [showForm, setShowForm] = useState(true)

  const generateUserId = () => {
    const year = new Date().getFullYear().toString().slice(-2)
    const count = users.length + 1
    return `ytc/${year}/${String(count).padStart(3, "0")}`
  }

  const addUser = (user: Omit<User, "id" | "createdAt">) => {
    const newUser: User = {
      ...user,
      id: generateUserId(),
      createdAt: new Date(),
    }
    setUsers([...users, newUser])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/backup-file-78994.appspot.com/o/file_000000002274620a8bc1c942af702bb7.png?alt=media&token=4b43cfa9-7608-453d-8089-fe0e990a1e21"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="object-contain p-2"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-sm text-slate-600">User Management System</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowForm(!showForm)}
                variant="outline"
                className="border-blue-300 text-blue-600 hover:bg-blue-50 font-medium"
              >
                {showForm ? "Hide Form" : "Show Form"}
              </Button>
              <Button
                onClick={onLogout}
                className="bg-slate-700 hover:bg-slate-800 text-white font-medium shadow-md hover:shadow-lg transition-all"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600">
            <p className="text-sm font-medium text-slate-600">Total Users</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{users.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-slate-400">
            <p className="text-sm font-medium text-slate-600">Last Added</p>
            <p className="text-xl font-semibold text-slate-900 mt-2">
              {users.length > 0 ? users[users.length - 1].fullName : "No users yet"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          {showForm && (
            <div>
              <UserForm onAddUser={addUser} />
            </div>
          )}

          {/* Users List Section */}
          <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
            <UsersList users={users} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-slate-600">
            Powered by <span className="font-semibold text-slate-900">Yobe Tech Connect</span>
            <br />
            <span className="text-xs mt-3 block text-slate-500">
              These are the official documents for record and confirmation purposes only.
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
