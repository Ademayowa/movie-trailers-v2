import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { BASE_URL, IMAGE_URL } from '@/config/index';
import {
  XIcon,
  ViewListIcon,
  BookmarkIcon,
  StarIcon,
} from '@heroicons/react/solid';
import ReactPlayer from 'react-player/lazy';

export default function Movie({ movie }) {
  return (
    <Layout title={movie.title || movie.original_name}>
      <div className='relative wrapper'>
        <div className='relative min-h-[calc(100vh-72px)] max-h-screen'>
          <Image
            layout='fill'
            objectFit='cover'
            src={
              `${IMAGE_URL}${movie.poster_path}` ||
              `${IMAGE_URL}${movie.backdrop_path || movie.poster_path}`
            }
          />
        </div>

        <div className='absolute inset-y-28 inset-x-4 md:inset-x-12 space-y-6 px-10 md:px-12'>
          <h1 className='text-4xl font-bold text-white'>
            {movie.title || movie.original_name}
          </h1>

          <div className='flex items-center space-x-3'>
            <button className='flex items-center justify-center bg-[#091725] text-white px-5 py-3 rounded cursor-pointer hover:bg-[#0e2438] text-xs md:text-base'>
              <img
                src={`/images/play-icon.svg`}
                alt='play-icon'
                className='h-6 md:8'
              />
              <span className='ml-[3px]'>TRAILER</span>
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

          <h4></h4>
          <h5 className='text-white font-bold text-2xl'>Overview</h5>
          <p className='text-white max-w-4xl text-base md:text-[20px]'>
            {movie.overview}
          </p>
        </div>

        <div className='bg-overlay'></div>
      </div>
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
    props: { movie },
  };
}
