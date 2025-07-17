import GenerateBtn from '@/app/UI/Button/GenerateBtn';
import UpgradeBtn from '@/app/UI/Button/Upgrade';
import { Home, LayoutDashboard, Link, Settings } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const Sidebar = () => {
    const name  = "Peter Mwansa"
  return (
    <div className="w-64 h-screen bg-gray-800 text-white sidebar flex flex-col p-5 sidebar">
      <div className='sidebar-profile'>
        <Image 
            className='sidebar-image'
            alt='The profile image if the user'
            src="/images/apple.png"
            width={60}
            height={60}
        />
        <h1 className='sidebar-name'>{name}</h1>
      </div>
      <div className='sidebar-generate'>
        <GenerateBtn />
      </div>
      <nav className="flex flex-col gap-4">
        <Link href="#" className="flex items-center gap-2 hover:text-gray-300">
          <Home size={20} />
          Home
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:text-gray-300">
          <LayoutDashboard size={20} />
          Analytics
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:text-gray-300">
          <Settings size={20} />
          Settings
        </Link>
        <div className='upgrade'>
            <UpgradeBtn />
        </div>
      </nav>
    </div>
  );
};
export default Sidebar
