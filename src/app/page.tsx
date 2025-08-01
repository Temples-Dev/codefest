'use client'
import React from 'react';
import Image from 'next/image';
import { Users, CreditCard, FileText, LogOut } from 'lucide-react';

const navigation = [
  {
    name: "Students",
    href: "/students",
    icon: Users,
  },
  {
    name: "Payment",
    href: "/payment", 
    icon: CreditCard,
  },
  {
    name: "Report",
    href: "/report",
    icon: FileText,
  },
];

export default function Dashboard() {
  const SidebarContent = () => (
    <div className="h-full w-64 flex flex-col bg-white shadow-2xl relative">
      {/* Header with Logo */}
      <div className="p-6 space-y-6">
        <div className="flex items-center">
          <div className="bg-[rgb(255,255,255)] p-4 rounded-xl  w-[120px] flex justify-center">
            <Image
              src="/Logo_Worldskills_Ghana.png"
              alt="WorldSkills Ghana Logo"
              width={160}
              height={50}
              priority
              className="object-contain"
            />
          </div>
        </div>

        <div className="h-px" style={{ background: 'linear-gradient(to right, rgb(5,5,137), rgb(255,139,0))' }}></div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <a 
              key={item.name} 
              href={item.href}
              className="group block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center p-3 rounded-xl transition-all duration-300 hover:shadow-md hover:translate-x-1 cursor-pointer hover:bg-[rgb(255,139,0)]/5">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[rgb(5,5,137)] text-white group-hover:bg-[rgb(255,139,0)] transition-all duration-300 shadow-md">
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <div className="ml-4">
                  <span className="text-gray-700 font-semibold group-hover:text-[rgb(5,5,137)]" style={{ fontFamily: 'Arial' }}>
                    {item.name}
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button className="w-full flex items-center p-3 rounded-xl transition-all duration-300 bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:translate-y-[-2px] group">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 group-hover:bg-white/30 transition-all duration-300">
            <LogOut className="w-5 h-5" />
          </div>
          
          <div className="ml-4">
            <span className="font-semibold" style={{ fontFamily: 'Arial' }}>Logout</span>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full z-50">
        <SidebarContent />
      </div>

      {/* Main Content Area with Fixed Margin */}
      <div className="ml-64">
        {/* Top Navigation Bar */}
        <nav className="bg-white shadow-lg border-b-2" style={{ borderBottomColor: 'rgb(255, 139, 0)' }}>
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Left side - Breadcrumb */}
              <div className="flex items-center space-x-2">
                <span style={{ fontFamily: 'Arial', fontSize: '14px', color: 'rgb(5, 5, 137)', fontWeight: 'bold' }}>
                  Dashboard
                </span>
                <span style={{ color: 'rgb(255, 139, 0)' }}>/</span>
                <span style={{ fontFamily: 'Arial', fontSize: '14px', color: 'black' }}>
                  Overview
                </span>
              </div>

              {/* Center - Search Bar */}
            

              {/* Right side - User Info & Notifications */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <svg className="w-6 h-6" style={{ color: 'rgb(5, 5, 137)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V7h10v10z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14l2-2 2 2" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{ fontFamily: 'Arial', fontSize: '10px' }}>
                    3
                  </span>
                </button>

                {/* User Profile */}
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: 'rgb(255, 139, 0)' }}>
                    <span style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: 'bold' }}>
                      AD
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <div style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: 'bold', color: 'rgb(5, 5, 137)' }}>
                      Admin User
                    </div>
                    <div style={{ fontFamily: 'Arial', fontSize: '12px', color: 'black' }}>
                      System Administrator
                    </div>
                  </div>
                  <svg className="w-4 h-4 hidden md:block" style={{ color: 'rgb(255, 139, 0)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="p-8 min-h-screen" style={{ backgroundColor: '#f5d200' }}>
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h1 
                style={{ 
                  fontFamily: 'Arial', 
                  fontSize: '36px', 
                  color: 'rgb(5, 5, 137)',
                  fontWeight: 'bold'
                }}
                className="mb-4"
              >
                WorldSkills Ghana Dashboard
              </h1>
              <p 
                style={{ 
                  fontFamily: 'Arial', 
                  fontSize: '16px', 
                  color: 'black'
                }}
                className="mb-6"
              >
                Welcome to your comprehensive management system. Monitor students, track payments, and generate insightful reports all in one place.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border-2 border-gray-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                  <div style={{ color: 'rgb(5, 5, 137)', fontFamily: 'Arial', fontSize: '24px', fontWeight: 'bold' }}>
                    1,247
                  </div>
                  <div style={{ color: 'black', fontFamily: 'Arial', fontSize: '12px' }}>
                    Total Students
                  </div>
                </div>
                <div className="bg-white border-2 border-gray-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                  <div style={{ color: 'rgb(255, 139, 0)', fontFamily: 'Arial', fontSize: '24px', fontWeight: 'bold' }}>
                    ₵89,450
                  </div>
                  <div style={{ color: 'black', fontFamily: 'Arial', fontSize: '12px' }}>
                    Monthly Revenue
                  </div>
                </div>
                <div className="bg-white border-2 border-gray-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                  <div style={{ color: 'rgb(5, 5, 137)', fontFamily: 'Arial', fontSize: '24px', fontWeight: 'bold' }}>
                    45
                  </div>
                  <div style={{ color: 'black', fontFamily: 'Arial', fontSize: '12px' }}>
                    Pending Payments
                  </div>
                </div>
                <div className="bg-white border-2 border-gray-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                  <div style={{ color: 'rgb(255, 139, 0)', fontFamily: 'Arial', fontSize: '24px', fontWeight: 'bold' }}>
                    12
                  </div>
                  <div style={{ color: 'black', fontFamily: 'Arial', fontSize: '12px' }}>
                    Reports Generated
                  </div>
                </div>
              </div>
            </div>

            {/* Main Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div style={{ backgroundColor: 'rgb(5, 5, 137)' }} className="p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
                <Users className="w-12 h-12 mb-4 text-white" />
                <h3 
                  style={{ 
                    fontFamily: 'Arial', 
                    fontSize: '24px', 
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                  className="mb-3"
                >
                  Students Management
                </h3>
                <p 
                  style={{ 
                    fontFamily: 'Arial', 
                    fontSize: '14px', 
                    color: 'white'
                  }}
                  className="mb-6"
                >
                  Comprehensive student database with enrollment tracking, academic progress monitoring, and profile management capabilities.
                </p>
                <button 
                  style={{ backgroundColor: 'rgb(255, 139, 0)', fontFamily: 'Arial', fontSize: '14px', fontWeight: 'bold' }}
                  className="px-6 py-3 rounded-lg text-white hover:opacity-90 transition-opacity"
                >
                  Manage Students
                </button>
              </div>
              
              <div style={{ backgroundColor: 'rgb(255, 139, 0)' }} className="p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
                <CreditCard className="w-12 h-12 mb-4 text-white" />
                <h3 
                  style={{ 
                    fontFamily: 'Arial', 
                    fontSize: '24px', 
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                  className="mb-3"
                >
                  Payment Processing
                </h3>
                <p 
                  style={{ 
                    fontFamily: 'Arial', 
                    fontSize: '14px', 
                    color: 'white'
                  }}
                  className="mb-6"
                >
                  Streamlined payment collection, fee tracking, receipt generation, and automated reminders for outstanding balances.
                </p>
                <button 
                  style={{ backgroundColor: 'rgb(5, 5, 137)', fontFamily: 'Arial', fontSize: '14px', fontWeight: 'bold' }}
                  className="px-6 py-3 rounded-lg text-white hover:opacity-90 transition-opacity"
                >
                  Process Payments
                </button>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border-2 border-gray-100">
                <FileText className="w-12 h-12 mb-4" style={{ color: 'rgb(5, 5, 137)' }} />
                <h3 
                  style={{ 
                    fontFamily: 'Arial', 
                    fontSize: '24px', 
                    color: 'rgb(5, 5, 137)',
                    fontWeight: 'bold'
                  }}
                  className="mb-3"
                >
                  Analytics & Reports
                </h3>
                <p 
                  style={{ 
                    fontFamily: 'Arial', 
                    fontSize: '14px', 
                    color: 'black'
                  }}
                  className="mb-6"
                >
                  Generate detailed insights with customizable reports, financial summaries, and performance analytics dashboards.
                </p>
                <button 
                  style={{ backgroundColor: 'rgb(255, 139, 0)', fontFamily: 'Arial', fontSize: '14px', fontWeight: 'bold' }}
                  className="px-6 py-3 rounded-lg text-white hover:opacity-90 transition-opacity"
                >
                  View Reports
                </button>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 
                  style={{ 
                    fontFamily: 'Arial', 
                    fontSize: '20px', 
                    color: 'rgb(5, 5, 137)',
                    fontWeight: 'bold'
                  }}
                  className="mb-6"
                >
                  Recent Student Activities
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "Kwame Asante", action: "Enrolled in Web Development", time: "2 hours ago" },
                    { name: "Ama Osei", action: "Completed Payment", time: "4 hours ago" },
                    { name: "Kofi Mensah", action: "Updated Profile", time: "6 hours ago" },
                    { name: "Akosua Boateng", action: "Started New Course", time: "1 day ago" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <div style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: 'bold', color: 'black' }}>
                          {activity.name}
                        </div>
                        <div style={{ fontFamily: 'Arial', fontSize: '12px', color: 'rgb(255, 139, 0)' }}>
                          {activity.action}
                        </div>
                      </div>
                      <div style={{ fontFamily: 'Arial', fontSize: '11px', color: 'black' }}>
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: 'rgb(5, 5, 137)' }} className="rounded-2xl shadow-xl p-8">
                <h3 
                  style={{ 
                    fontFamily: 'Arial', 
                    fontSize: '20px', 
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                  className="mb-6"
                >
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  <button className="w-full bg-white hover:bg-gray-50 p-4 rounded-xl text-left transition-colors duration-200">
                    <div style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: 'bold', color: 'rgb(5, 5, 137)' }}>
                      Add New Student
                    </div>
                    <div style={{ fontFamily: 'Arial', fontSize: '12px', color: 'rgb(255, 139, 0)' }}>
                      Register a new student to the system
                    </div>
                  </button>
                  
                  <button style={{ backgroundColor: 'rgb(255, 139, 0)' }} className="w-full hover:opacity-90 p-4 rounded-xl text-left transition-opacity duration-200">
                    <div style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: 'bold', color: 'white' }}>
                      Generate Monthly Report
                    </div>
                    <div style={{ fontFamily: 'Arial', fontSize: '12px', color: 'white' }}>
                      Create comprehensive monthly summary
                    </div>
                  </button>
                  
                  <button className="w-full bg-white hover:bg-gray-50 p-4 rounded-xl text-left transition-colors duration-200">
                    <div style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: 'bold', color: 'rgb(5, 5, 137)' }}>
                      Send Payment Reminders
                    </div>
                    <div style={{ fontFamily: 'Arial', fontSize: '12px', color: 'rgb(255, 139, 0)' }}>
                      Notify students with pending payments
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}