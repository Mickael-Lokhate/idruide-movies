import carouselStyle from "./carousel.module.scss";
import ArrowRight from "baseui/icon/arrow-right";
import ArrowLeft from "baseui/icon/arrow-left";
import { useEffect, useState } from "react";
import Link from "next/link";

export function convertMinutes(min) {
  let hours = min / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  let final =
    rhours + (rminutes.toString().length === 1 ? "h0" : "h") + rminutes + "m";
  return final;
}

export function Movie({ movie }) {
  const [movieDetails, setMovieDetails] = useState(null);
  useEffect(() => {
    const getMovieDetails = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=9548c19ec4f1f2218d88c267b59e3806`
      );
      const data = await res.json();
      setMovieDetails(data);
    };
    if (!movieDetails) {
      getMovieDetails();
    }
  });

  if (movieDetails) {
    return (
      <div className={carouselStyle.movie}>
        <Link href={`/movie/${movieDetails.id}`}>
          <img
            width={140}
            height={200}
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            className={carouselStyle.movieImg}
          />
        </Link>
        <Link href={`/movie/${movieDetails.id}`}>
          <h3 className={carouselStyle.movieTitle}>{movie.title}</h3>
        </Link>
        <p className={carouselStyle.duration}>
          {convertMinutes(movieDetails.runtime)}
        </p>
      </div>
    );
  }
  return false;
}

export default function Carousel({ title, data }) {
  const movies = data.map((m, i) => {
    return <Movie movie={m} key={i} />;
  });
  return (
    <div className={carouselStyle.container}>
      <h2 className={carouselStyle.title}>{title}</h2>
      <div className={carouselStyle.carousel}>
        <div className={carouselStyle.arrowContainer}>
          <ArrowLeft size={32} className={carouselStyle.arrow} />
        </div>

        <div className={carouselStyle.movies}>{movies}</div>

        <div className={carouselStyle.arrowContainer}>
          <ArrowRight size={32} className={carouselStyle.arrow} />
        </div>
      </div>
    </div>
  );
}
