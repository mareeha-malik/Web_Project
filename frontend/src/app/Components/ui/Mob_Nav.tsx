import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { FiHeart } from 'react-icons/fi'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { IoMenuOutline } from 'react-icons/io5'

const Mob_Nav = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-HeaderWalaBlack max-w-[500px] mob_navbar px-8">
      <div className="flex justify-between text-[28px] py-2 text-white">
        <IoMenuOutline />
        <div className="relative">
          <HiOutlineShoppingBag />
          <div className="bg-BrightOrange rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
            0
          </div>
        </div>
        <AiOutlineHome />
        <div className="relative">
          <FiHeart />
          <div className="bg-BrightOrange rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
            0
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mob_Nav
