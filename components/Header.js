import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BASE_URL } from '@/config/index';

function NavLink({ to, children }) {
  return (
    <Link href={to}>
      <a className={`mx-2`}>{children}</a>
    </Link>
  );
}

function MobileNav({ open, setOpen }) {
  const router = useRouter();

  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen bg-[#040714] transform ${
        open ? '-translate-x-0' : '-translate-x-full px-4'
      } transition-transform duration-300 ease-in-out filter drop-shadow-md`}
    >
      <div className='header' />
      <div className='flex flex-col px-10'>
        <Link href='/upcoming'>
          <a
            className='text-xl font-medium my-3'
            onClick={() => setOpen(!open)}
          >
            Latest Movies
          </a>
        </Link>
        {/* <a
          className='text-xl font-normal my-3'
          href='#top'
          onClick={() => setOpen(!open)}
        >
          Tv Shows
        </a> */}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className='header'>
      <MobileNav open={open} setOpen={setOpen} />
      <a
        className='flex items-center cursor-pointer'
        onClick={() => router.push('/')}
      >
        <Image
          src={`/images/logo.png`}
          width={150}
          height={150}
          objectFit='contain'
        />
      </a>

      <div className='w-9/12 flex justify-end items-center md:ml-auto'>
        <div
          className='z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden'
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${
              open ? 'rotate-45 translate-y-3.5' : ''
            }`}
          />
          <span
            className={`h-1 w-full bg-white rounded-lg transition-all duration-300 ease-in-out ${
              open ? 'w-0' : 'w-full'
            }`}
          />
          <span
            className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${
              open ? '-rotate-45 -translate-y-3.5' : ''
            }`}
          />
        </div>

        <div className='hidden md:flex'>
          <NavLink to='/upcoming'>Latest Movies</NavLink>
          <NavLink to='/#top'>TV Shows</NavLink>
        </div>
      </div>
    </nav>
  );
}
