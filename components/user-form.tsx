"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserFormProps {
  onAddUser: (user: {
    fullName: string
    email: string
    phoneNumber: string
    gender: string
    imageUrl: string | null
    idNumber: string
  }) => void
}

export default function UserForm({ onAddUser }: UserFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "male",
    imageFile: null as File | null,
    idNumber: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"
    if (!formData.idNumber.trim()) newErrors.idNumber = "ID Number is required"
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, imageFile: file })
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true)
      setTimeout(() => {
        onAddUser({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          gender: formData.gender,
          imageUrl: imagePreview,
          idNumber: formData.idNumber,
        })
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          gender: "male",
          imageFile: null,
          idNumber: "",
        })
        setImagePreview(null)
        setIsSubmitting(false)
      }, 400)
    }
  }

  return (
    <Card className="shadow-lg border-slate-200 sticky top-8">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
        <CardTitle className="text-xl text-slate-900">Add New User</CardTitle>
        <CardDescription>Register a new member to the system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Profile Image</label>
          <div className="flex gap-4 items-start">
            {imagePreview && (
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-slate-300 shadow-md flex-shrink-0">
                <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isSubmitting}
              className="text-sm text-slate-600 file:mr-2 file:py-2 file:px-3 file:bg-blue-50 file:border file:border-slate-300 file:rounded file:text-sm file:font-semibold hover:file:bg-blue-100 cursor-pointer disabled:opacity-50"
            />
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Full Name</label>
          <Input
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            disabled={isSubmitting}
            className={`border-2 ${errors.fullName ? "border-red-500" : "border-slate-200"} rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all`}
          />
          {errors.fullName && <p className="text-red-500 text-xs font-medium">{errors.fullName}</p>}
        </div>

        {/* ID Number */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">ID Number</label>
          <Input
            type="text"
            placeholder="e.g., ytc/25/001"
            value={formData.idNumber}
            onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
            disabled={isSubmitting}
            className={`border-2 ${errors.idNumber ? "border-red-500" : "border-slate-200"} rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all`}
          />
          {errors.idNumber && <p className="text-red-500 text-xs font-medium">{errors.idNumber}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <Input
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={isSubmitting}
            className={`border-2 ${errors.email ? "border-red-500" : "border-slate-200"} rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all`}
          />
          {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Phone Number</label>
          <Input
            type="tel"
            placeholder="+234 (800) 123-4567"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            disabled={isSubmitting}
            className={`border-2 ${errors.phoneNumber ? "border-red-500" : "border-slate-200"} rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all`}
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs font-medium">{errors.phoneNumber}</p>}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Gender</label>
          <Select
            value={formData.gender}
            onValueChange={(value) => setFormData({ ...formData, gender: value })}
            disabled={isSubmitting}
          >
            <SelectTrigger className="border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 mt-6"
        >
          {isSubmitting ? "Adding User..." : "Add User"}
        </Button>
      </CardContent>
    </Card>
  )
}
