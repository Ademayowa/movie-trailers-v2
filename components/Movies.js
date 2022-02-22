export default function Movies({ movies, title }) {
  return (
    <div className='pt-14 px-10 md:px-12'>
      <div>
        <h2 className='text-[20px] md:text-3xl font-bold'>{title}</h2>
      </div>

      {movies.map((movie) => (
        <div key={movie.id}>{movie.name}</div>
      ))}
    </div>
  );
}
