import carouselStyle from "./carousel.module.scss";
import ArrowRight from "baseui/icon/arrow-right";
import ArrowLeft from "baseui/icon/arrow-left";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ProgressBar, SIZE } from "baseui/progress-bar";
import { convertNoteToPercent } from "../pages/movie/[id]";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

export function convertMinutes(min) {
  let hours = min / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  let final =
    rhours + (rminutes.toString().length === 1 ? "h0" : "h") + rminutes + "m";
  return final;
}

export function Movie({ movie, duration }) {
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
        {duration ? (
          <p className={carouselStyle.duration}>
            {convertMinutes(movieDetails.runtime)}
          </p>
        ) : (
          <div className={carouselStyle.avgContainer}>
            <ProgressBar
              value={convertNoteToPercent(movie.vote_average)}
              size={SIZE.large}
              overrides={{
                BarProgress: {
                  style: ({ $theme }) => ({
                    backgroundColor: "#33BD52",
                  }),
                },
                BarContainer: {
                  style: ({ $theme }) => ({
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    borderRadius: "50px",
                  }),
                },
              }}
            />
            <span className={carouselStyle.votePercent}>
              {convertNoteToPercent(movie.vote_average)}%
            </span>
          </div>
        )}
      </div>
    );
  }
  return false;
}

export default function MyCarousel({ title, data, duration }) {
  const movies = data.map((m, i) => {
    return <Movie movie={m} key={i} duration={duration} />;
  });
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 20,
    },
  };

  const ButtonGroup = ({ next, previous }) => {
    return (
      <>
        <div
          className={`${carouselStyle.arrowContainer} ${carouselStyle.arrowLeft}`}
          onClick={() => previous()}
        >
          <ArrowLeft
            size={32}
            className={`${carouselStyle.arrow} ${carouselStyle.arrowLIcon}`}
          />
        </div>
        <div
          className={`${carouselStyle.arrowContainer} ${carouselStyle.arrowRight}`}
          onClick={() => next()}
        >
          <ArrowRight
            size={32}
            className={`${carouselStyle.arrow} ${carouselStyle.arrowRIcon}`}
          />
        </div>
      </>
    );
  };
  return (
    <div className={carouselStyle.container}>
      <h2 className={carouselStyle.title}>{title}</h2>

      <Carousel
        swipeable={true}
        draggable={false}
        responsive={responsive}
        infinite={false}
        keyBoardControl={false}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
        centerMode={true}
        renderArrowsWhenDisabled={true}
      >
        {movies}
      </Carousel>
    </div>
  );
}
