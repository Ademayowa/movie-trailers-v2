import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Layout from '@/components/Layout';
import Movies from '@/components/Movies';
import Shows from '@/components/Shows';
import { BASE_URL } from '@/config/index';

export default function HomePage({
  popularMovies,
  upcomingMovies,
  topRatedShows,
}) {
  console.log(upcomingMovies);

  return (
    <Layout title='Movie Trailers | Home'>
      <Hero />
      <Movies movies={popularMovies} title="What's Popular" />
      <Movies movies={upcomingMovies} title='Upcoming Movies' />
      <Shows movies={topRatedShows} title='Top Rated Shows' />
      <Footer />
    </Layout>
  );
}

export async function getServerSideProps() {
  const [popularMoviesRes, upcomingMoviesRes, topRatedShowsRes] =
    await Promise.all([
      fetch(
        `${BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
      ),

      fetch(
        `${BASE_URL}/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`
      ),

      fetch(
        `${BASE_URL}/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
      ),
    ]);

  const [popularMovies, upcomingMovies, topRatedShows] = await Promise.all([
    popularMoviesRes.json(),
    upcomingMoviesRes.json(),
    topRatedShowsRes.json(),
  ]);

  return {
    props: {
      popularMovies: popularMovies?.results,
      upcomingMovies: upcomingMovies?.results,
      topRatedShows: topRatedShows?.results,
    },
  };
}
