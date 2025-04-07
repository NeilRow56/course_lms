import Spinner from '@/components/shared/spinner'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <Spinner label='Processing...' />
    </div>
  )
}
