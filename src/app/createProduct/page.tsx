import { Button } from '@/components/ui/button'
import React from 'react'

function page() {
  return (
    <div className='flex justify-center items-center flex-col gap-5 w-screen h-screen bg-gray-100 '>
            <h1 className='text-3xl font-semibold'>Create Order </h1>
        <form className='flex justify-center items-center flex-col w-1/2 h-3/4 gap-5 rounded-lg shadow-lg bg-white p-5'>
            <input placeholder='Enter The product Name  ' className='p-3 w-3/4  bg-blue-300 text-cyan-600 rounded-full  placeholder:text-cyan-600 shadow-xl' type="text" />
            <input placeholder='Enter The product price   ' className='p-3 w-3/4  bg-blue-300 text-cyan-600 rounded-full  placeholder:text-cyan-600 shadow-xl' type="text" />
            <input placeholder='Enter The product  ' className='p-3 w-3/4  bg-blue-300 text-cyan-600 rounded-full  placeholder:text-cyan-600 shadow-xl' type="text" />
            <input placeholder='Enter The product Stock ' className='p-3 w-3/4  bg-blue-300 text-cyan-600 rounded-full  placeholder:text-cyan-600 shadow-xl' type="text" />
            {/* <button type="submit" className='p-2 '>Create</button> */}
            <Button className='bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition duration-300'>Create Product</Button>
        </form>
    </div>
  )
}

export default page