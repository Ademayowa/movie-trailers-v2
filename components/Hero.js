import Layout from './Layout';

export default function Hero() {
  return (
    // adjust margin on smaller screens later
    <div className='hero px-10 py-20 md:px-12 text-white text-2xl md:text-6xl'>
      <h1 className='leading-tight md:font-bold md:max-w-5xl'>
        Watch the latest movie trailers, Tv Shows, popular movies and find
        popular actors.
      </h1>
    </div>
  );
}
