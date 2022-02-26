import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header className='header'>
      <a className='header-link' onClick={() => router.push('/')}>
        <img src='/images/movie-icon.svg' alt='logo' className='h-5' />
        <span>Movie Trailers</span>
      </a>

      <div className='ml-auto flex items-center space-x-4 hidden md:block'>
        <ul className='header-link group space-x-6'>
          <li>
            <a href='#top'>Movies</a>
          </li>
          <li>
            <a href='#top'>Tv Shows</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
