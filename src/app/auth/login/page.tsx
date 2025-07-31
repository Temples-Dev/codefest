import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center animate-fadeIn" 
         style={{ background: 'rgb(5, 5, 137)' }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-[rgb(255,255,255)] rounded-lg shadow-2xl border-2 animate-slideDown "
           style={{ borderColor: 'rgb(255, 139, 0)' }}>
        <div className="space-y-4 text-center">
          <div className="flex justify-center animate-pulse">
            <Image
              src="/Logo_Worldskills_Ghana.png"
              alt="WorldSkills Ghana Logo"
              width={180}
              height={60}
              priority
            />
          </div>
          <h1 className="text-3xl font-bold animate-slideDown" 
              style={{ color: 'rgb(5, 5, 137)' }}>
            Welcome Back
          </h1>
          <p className="text-sm animate-fadeIn"
             style={{ color: 'rgb(5, 5, 137, 0.7)' }}>
            Sign in to your account
          </p>
        </div>
        
        <form className="space-y-4">
          <div className="space-y-2 animate-slideRight">
            <label className="text-sm font-medium" 
                   style={{ color: 'rgb(5, 5, 137)' }} 
                   htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:border-[rgb(255,139,0)] outline-none"
              style={{ borderColor: 'rgb(5, 5, 137, 0.3)' }}
            />
          </div>
          
          <div className="space-y-2 animate-slideLeft">
            <label className="text-sm font-medium" 
                   style={{ color: 'rgb(5, 5, 137)' }} 
                   htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:border-[rgb(255,139,0)] outline-none"
              style={{ borderColor: 'rgb(5, 5, 137, 0.3)' }}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 animate-slideUp hover:opacity-90 hover:scale-[1.02]"
            style={{ 
              background: 'rgb(255, 139, 0)',
              border: '2px solid rgb(255, 139, 0)'
            }}>
            Sign In
          </Button>
        </form>

        <div className="space-y-4 text-center animate-fadeIn">
          <div className="text-sm">
            <Link 
              href="/auth/signup" 
              className="transition-all duration-300 hover:text-[rgb(255,139,0)]"
              style={{ color: 'rgb(5, 5, 137)' }}>
              Create a new account
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default LoginPage