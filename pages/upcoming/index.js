import Image from 'next/image';
import { BASE_URL, IMAGE_URL } from '@/config/index';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function UpcomingMovies({ movies }) {
  const router = useRouter();

  return (
    <Layout title='Upcoming Movies'>
      <div className='px-10 md:px-12 my-10 text-white'>
        <h2 className='text-[20px] text-center md:text-3xl md:my-10 md:text-left font-bold text-white mb-4'>
          Upcoming Movies
        </h2>

        <div className='grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 cursor-pointer'>
          {movies.map((movie) => (
            <div className='mx-auto transform hover:scale-105 transition duration-500'>
              <Image
                onClick={() => router.push(`/movie/${movie.id}`)}
                src={`${IMAGE_URL}${movie.backdrop_path || movie.poster_path}`}
                width={200}
                height={200}
                object='cover'
                className='rounded-t-lg'
              />

              <div className='bg-white px-2 py-5 -mt-2 shadow-lg rounded-b-lg'>
                <div className='text-black font-bold tracking-wider'>
                  {movie.title}
                </div>

                <div className='text-gray-600 font-bold tracking-wider'>
                  {new Date(movie.release_date).toLocaleDateString('en-US')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );

  const movies = await res.json();

  return {
    props: {
      movies: movies.results,
    },
  };
}
