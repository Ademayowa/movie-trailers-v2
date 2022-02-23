import Hero from '@/components/Hero';
import Layout from '@/components/Layout';
import Movies from '@/components/Movies';
import { BASE_URL } from '@/config/index';

export default function HomePage({ popularMovies, topRatedShows }) {
  console.log(topRatedShows);

  return (
    <Layout title='Movie Trailers | Home'>
      <Hero />
      <Movies movies={popularMovies} title="What's Popular" />
    </Layout>
  );
}

export async function getServerSideProps() {
  const [popularMoviesRes, popularShowsRes, topRatedShowsRes] =
    await Promise.all([
      fetch(
        `${BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
      ),

      fetch(
        `${BASE_URL}/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
      ),

      fetch(
        `${BASE_URL}/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
      ),
    ]);

  const [popularMovies, popularShows, topRatedShows] = await Promise.all([
    popularMoviesRes.json(),
    popularShowsRes.json(),
    topRatedShowsRes.json(),
  ]);

  return {
    props: {
      popularMovies: popularMovies?.results,
      popularShows: popularShows?.results,
      topRatedShows: topRatedShows?.results,
    },
  };
}
