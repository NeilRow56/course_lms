import { Button } from '@/components/ui/button'

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ReactNode, Suspense } from 'react'

export default function ConsumerLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

function Navbar() {
  return (
    <header className='bg-background z-10 flex h-12 items-center shadow'>
      <nav className='container mx-auto flex gap-4 p-8'>
        <Link
          className='mr-auto flex items-center text-lg hover:underline'
          href='/'
        >
          Web Dev Simplified
        </Link>
        <Suspense>
          <SignedIn>
            <Link
              className='hover:bg-accent/10 flex items-center px-2 hover:rounded-md'
              href='/admin'
            >
              Admin
            </Link>
            <Link
              className='hover:bg-accent/10 flex items-center px-2 hover:rounded-md'
              href='/courses'
            >
              My Courses
            </Link>

            <Link
              className='hover:bg-accent/10 flex items-center px-2 hover:rounded-md'
              href='/purchases'
            >
              Purchase History
            </Link>
            <div className='size-8 self-center'>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: { width: '100%', height: '100%' }
                  }
                }}
              />
            </div>
          </SignedIn>
        </Suspense>
        <Suspense>
          <SignedOut>
            <Button className='self-center' asChild>
              <SignInButton>Sign In</SignInButton>
            </Button>
          </SignedOut>
        </Suspense>
      </nav>
    </header>
  )
}
