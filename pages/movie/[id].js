import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Image from 'next/image';
import {
  XIcon,
  ViewListIcon,
  BookmarkIcon,
  StarIcon,
} from '@heroicons/react/solid';
import ReactPlayer from 'react-player/lazy';
import { BASE_URL, IMAGE_URL } from '@/config/index';

export default function Movie({ movie }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const router = useRouter();

  const index = movie.videos.results.findIndex(
    (element) => element.type === 'Trailer'
  );

  return (
    <Layout title={movie.title || movie.original_name}>
      <section className='relative z-50'>
        <div className='relative min-h-[calc(100vh-72px)] max-h-screen'>
          <Image
            src={
              `${IMAGE_URL}${movie.backdrop_path || movie.poster_path}` ||
              `${IMAGE_URL}${movie.poster_path}`
            }
            layout='fill'
            objectFit='cover'
          />
        </div>

        <div className='absolute inset-y-28 md:inset-y-auto md:bottom-20 inset-x-4 md:inset-x-12 space-y-6 z-50'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white'>
            {movie.title || movie.original_name}
          </h1>

          <div className='flex items-center space-x-4'>
            <button
              className='text-xs md:text-base bg-[#091725] text-white flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#10283f] cursor-pointer'
              onClick={() => setShowPlayer(true)}
            >
              <img
                src='/images/play-icon.svg'
                alt='play-icon'
                className='h-6 md:h-8'
              />
              <span className='font-medium tracking-wide'>TRAILER</span>
            </button>

            <div className='movie-icons'>
              <ViewListIcon className='h-6' />
            </div>

            <div className='movie-icons'>
              <BookmarkIcon className='h-6' />
            </div>

            <div className='movie-icons'>
              <StarIcon className='h-6' />
            </div>
          </div>

          <h4 className='text-xs md:text-sm text-white'>
            {movie.release_date} •{' '}
            {movie.genres.map((genre) => genre.name + ', ')}{' '}
            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
          </h4>
          <p className='text-sm md:text-lg max-w-4xl text-white'>
            {movie.overview.length > 180
              ? movie.overview.substring(0, 210) + '...'
              : movie.overview}
          </p>
        </div>

        {/* Bg Overlay */}
        {showPlayer && (
          <div className='absolute inset-0 bg-black opacity-50 h-full w-full z-50' />
        )}

        <div
          className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
            showPlayer ? 'opacity-100 z-50' : 'opacity-0'
          }`}
        >
          <div className='flex items-center justify-between bg-black text-[#f9f9f9] p-3.5'>
            <span className='font-semibold'>Play Trailer</span>
            <div
              className='cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]'
              onClick={() => setShowPlayer(false)}
            >
              <XIcon className='h-5' />
            </div>
          </div>
          <div className='relative pt-[56.25%]'>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${movie.videos?.results[index]?.key}`}
              width='100%'
              height='100%'
              style={{ position: 'absolute', top: '0', left: '0' }}
              controls={true}
              playing={showPlayer}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos`
  );
  const movie = await res.json();

  return {
    props: {
      movie,
    },
  };
}
