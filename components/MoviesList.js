import Image from 'next/image';
import { useRouter } from 'next/router';
import { IMAGE_URL } from '@/config/index';

export default function MoviesList({ movie }) {
  const router = useRouter();

  return (
    <div className='flex mt-2 md:mt-5 mb-5 min-w-[250px] min-h-[170px] md:min-w-[300px] md:min-h-[400px] rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300'>
      <Image
        onClick={() => router.push(`/movie/${movie.id}`)}
        src={
          `${IMAGE_URL}${movie.poster_path}` ||
          `${IMAGE_URL}${movie.backdrop_path || movie.poster_path}`
        }
        width={300}
        height={400}
        className='rounded-lg'
        objectFit='cover'
      />
    </div>
  );
}
