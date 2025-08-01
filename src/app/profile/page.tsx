"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Lock, Eye, EyeOff } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profileData, setProfileData] = useState({
    username: "",
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    role: "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      // Load profile data (in real app, fetch from API)
      setProfileData({
        username: parsedUser.username,
        firstName: "John",
        surname: "Doe",
        email: "john.doe@htu.edu.gh",
        phone: "0244123456",
        role: parsedUser.role,
      })
    }
  }, [router])

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Profile updated successfully!")
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match")
      return
    }
    alert("Password changed successfully!")
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  if (!user) return null

  return (
    <DashboardLayout user={user}>
      <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-orange-brand rounded-full flex items-center justify-center mx-auto sm:mx-0">
              <span className="text-white text-lg sm:text-2xl font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-heading">Profile Settings</h1>
              <p className="text-sm sm:text-base text-gray-600">Manage your account information and security</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-4 sm:space-y-6">
          <TabsList className="bg-white border border-gray-200 w-full sm:w-auto">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-blue-brand data-[state=active]:text-white text-xs sm:text-sm flex-1 sm:flex-none"
            >
              Profile Information
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="data-[state=active]:bg-blue-brand data-[state=active]:text-white text-xs sm:text-sm flex-1 sm:flex-none"
            >
              Change Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-white pt-0 shadow-sm border border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-gray-900 text-sm sm:text-base">
                  <User className="h-4 sm:h-5 w-4 sm:w-5 text-blue-brand" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-600 text-xs sm:text-sm">
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleProfileUpdate} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-xs sm:text-sm font-medium text-gray-700">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value={profileData.username}
                        onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                        className="border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20 text-sm"
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-xs sm:text-sm font-medium text-gray-700">
                        Role
                      </Label>
                      <Input
                        id="role"
                        value={profileData.role}
                        className="border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20 text-sm"
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-xs sm:text-sm font-medium text-gray-700">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        className="border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surname" className="text-xs sm:text-sm font-medium text-gray-700">
                        Surname
                      </Label>
                      <Input
                        id="surname"
                        value={profileData.surname}
                        onChange={(e) => setProfileData({ ...profileData, surname: e.target.value })}
                        className="border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs sm:text-sm font-medium text-gray-700">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-blue-brand hover:bg-blue-800 text-white w-full sm:w-auto">
                      Update Profile
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card className="bg-white pt-0 shadow-sm border border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-gray-900 text-sm sm:text-base">
                  <Lock className="h-4 sm:h-5 w-4 sm:w-5 text-orange-brand" />
                  Change Password
                </CardTitle>
                <CardDescription className="text-gray-600 text-xs sm:text-sm">
                  Update your account password
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handlePasswordChange} className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-xs sm:text-sm font-medium text-gray-700">
                      Current Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20 pr-10 text-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-xs sm:text-sm font-medium text-gray-700">
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20 pr-10 text-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-xs sm:text-sm font-medium text-gray-700">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20 pr-10 text-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                    <h4 className="text-xs sm:text-sm font-medium text-yellow-800 mb-2">Password Requirements:</h4>
                    <ul className="text-xs sm:text-sm text-yellow-700 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Include at least one number</li>
                      <li>• Include at least one special character</li>
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-orange-brand hover:bg-orange-600 text-white w-full sm:w-auto">
                      Change Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
