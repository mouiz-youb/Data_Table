import { Button } from '@/components/ui/button'
import React from 'react'

function page() {
  return (
    <div className='flex justify-center items-center flex-col gap-5 w-screen h-screen bg-gray-100 '>
            <h1 className='text-3xl font-semibold'>Sign up  </h1>
        <form className='flex justify-center items-center flex-col w-1/2 h-3/4 gap-5 rounded-lg shadow-lg bg-white p-5'>
            <input placeholder='Enter Your Name   ' className='p-3 w-3/4  bg-blue-300 text-cyan-600 rounded-full  placeholder:text-cyan-600 shadow-xl' type="text" />
            <input placeholder='Enter Your Email   ' className='p-3 w-3/4  bg-blue-300 text-cyan-600 rounded-full  placeholder:text-cyan-600 shadow-xl' type="text" />
            <input placeholder='Enter Password  ' className='p-3 w-3/4  bg-blue-300 text-cyan-600 rounded-full  placeholder:text-cyan-600 shadow-xl' type="text" />
            <Button className='bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition duration-300'>Sign up</Button>
        </form>
    </div>
  )
}

export default page