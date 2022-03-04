import ShowsList from './ShowsList';

export default function Shows({ movies, title }) {
  return (
    <div className='movies-bg flex flex-col pt-14 px-10 md:px-12 max-w-[2560px]'>
      <h2 className='text-[20px] md:text-3xl font-bold text-white'>{title}</h2>

      <div className='flex p-2 -m-2 space-x-6 overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-blue-300'>
        {movies.map((movie) => (
          <ShowsList key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
