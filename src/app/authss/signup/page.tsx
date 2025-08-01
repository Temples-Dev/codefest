import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center animate-fadeIn py-4" 
         style={{ background: 'rgb(245, 210, 0)' }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-[rgb(255,255,255)] rounded-lg shadow-2xl border-2 animate-slideDown"
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
          <h1 className="text-[36px] font-bold animate-slideDown" 
              style={{ 
                color: 'rgb(5, 5, 137)',
                fontFamily: 'Arial'
              }}>
            Create Account
          </h1>
          <p className="text-[14px] animate-fadeIn"
             style={{ 
               color: 'rgb(0, 0, 0)',
               fontFamily: 'Arial'
             }}>
            Join WorldSkills Ghana community
          </p>
        </div>
        
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 animate-slideRight">
              <label className="text-[12px] font-bold" 
                     style={{ 
                       color: 'rgb(5, 5, 137)',
                       fontFamily: 'Arial'
                     }} 
                     htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                className="w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:border-[rgb(255,139,0)] outline-none"
                style={{ 
                  borderColor: 'rgb(5, 5, 137)',
                  fontFamily: 'Arial',
                  fontSize: '14px'
                }}
              />
            </div>
            <div className="space-y-2 animate-slideLeft">
              <label className="text-sm font-medium" 
                     style={{ color: 'rgb(5, 5, 137)' }} 
                     htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                className="w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:border-[rgb(255,139,0)] outline-none"
                style={{ borderColor: 'rgb(5, 5, 137, 0.3)' }}
              />
            </div>
          </div>

          <div className="space-y-2 animate-slideRight">
            <label className="text-sm font-medium" 
                   style={{ color: 'rgb(5, 5, 137)' }} 
                   htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              className="w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:border-[rgb(255,139,0)] outline-none"
              style={{ borderColor: 'rgb(5, 5, 137, 0.3)' }}
            />
          </div>

          <div className="space-y-2 animate-slideLeft">
            <label className="text-sm font-medium" 
                   style={{ color: 'rgb(5, 5, 137)' }} 
                   htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+233 XX XXX XXXX"
              className="w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:border-[rgb(255,139,0)] outline-none"
              style={{ borderColor: 'rgb(5, 5, 137, 0.3)' }}
            />
          </div>
          
          <div className="space-y-2 animate-slideRight">
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

          <div className="space-y-2 animate-slideLeft">
            <label className="text-sm font-medium" 
                   style={{ color: 'rgb(5, 5, 137)' }} 
                   htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:border-[rgb(255,139,0)] outline-none"
              style={{ borderColor: 'rgb(5, 5, 137, 0.3)' }}
            />
          </div>

          

          <Button 
            type="submit" 
            className="w-full py-3 font-bold rounded-lg transition-all duration-300 animate-slideUp hover:opacity-90 hover:scale-[1.02]"
            style={{ 
              background: 'rgb(255, 139, 0)',
              border: '2px solid rgb(255, 139, 0)',
              color: 'rgb(255, 255, 255)',
              fontFamily: 'Arial',
              fontSize: '16px'
            }}>
            Create Account
          </Button>
        </form>

        <div className="text-center animate-fadeIn">
          <p className="text-[14px]" style={{ fontFamily: 'Arial', color: 'rgb(0, 0, 0)' }}>
            Already have an account?{' '}
            <Link 
              href="/auth/login" 
              className="transition-all duration-300 hover:text-[rgb(255,139,0)]"
              style={{ 
                color: 'rgb(5, 5, 137)',
                fontFamily: 'Arial',
                fontWeight: 'bold'
              }}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage