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

      <div className='ml-auto flex items-center space-x-4'>
        <a className='header-link group' onClick={() => router.push('/')}>
          <span>Movies</span>
        </a>
        <a className='header-link group'>
          <span>Tv Shows</span>
        </a>
        <a className='header-link group'>
          <span>People</span>
        </a>
      </div>
    </header>
  );
}
