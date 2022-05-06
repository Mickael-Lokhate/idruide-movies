import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import detailsStyle from "./details.module.scss";
import ReactPlayer from "react-player";
import ArrowRight from "baseui/icon/arrow-right";
import Link from "next/link";
import { convertMinutes } from "../../components/carousel";
import { ProgressBar, SIZE } from "baseui/progress-bar";
import { StarRating } from "baseui/rating";
import Button, { BTN_STYLE } from "../../components/button";

import { Spinner } from "baseui/spinner";
import { withStyle } from "baseui";

export const Loading = withStyle(Spinner, {
  width: "80px",
  height: "80px",
  borderLeftWidth: "6px",
  borderRightWidth: "6px",
  borderTopWidth: "6px",
  borderBottomWidth: "6px",
  borderTopColor: "white",
  borderBottomColor: "rgba(255, 255, 255, 0.2);",
  borderLeftColor: "rgba(255, 255, 255, 0.2);",
  borderRightColor: "rgba(255, 255, 255, 0.2);",
});

function PlayButton() {
  return (
    <div className={detailsStyle.playButton}>
      <div className={detailsStyle.playIcon}></div>
    </div>
  );
}

function Cast({ cast }) {
  const generateElems = () => {
    return cast.map((p, i) => {
      return (
        <div className={detailsStyle.castInfos} key={i}>
          <div className={detailsStyle.castProfileContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${p.profile_path}`}
              className={detailsStyle.castProfile}
            />
          </div>
          <h5>{p.original_name}</h5>
          <p>{p.character}</p>
        </div>
      );
    });
  };

  return (
    <ul className={detailsStyle.castList}>
      {generateElems()}
      <div className={detailsStyle.moreCast}>
        <Link href="#">
          <p>Voir tout</p>
        </Link>
        <Link href="#">
          <ArrowRight className={detailsStyle.arrow} size={32} />
        </Link>
      </div>
    </ul>
  );
}

export function convertNoteToPercent(note) {
  return Math.floor(note * 10);
}

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [crew, setCrew] = useState(null);
  const [cast, setCast] = useState(null);
  const [director, setDirector] = useState(null);
  const [screenplay, setScreenplay] = useState(null);
  const [story, setStory] = useState(null);
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState("");

  const generateVideosElements = () => {
    return videos.map((v, i) => {
      return (
        <li key={i}>
          <ReactPlayer
            url={`https://www.youtube.com/embed/${v.key}`}
            controls={true}
            light={true}
            playIcon={<PlayButton />}
            width={350}
            height={199}
          />
        </li>
      );
    });
  };

  useEffect(() => {
    const getMovieDatas = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=9548c19ec4f1f2218d88c267b59e3806`
      );

      const data = await res.json();
      if (data.success === false) setError("Movie not found");
      else setMovie(data);
    };
    const getMovieVideos = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=9548c19ec4f1f2218d88c267b59e3806`
      );

      const data = await res.json();
      if (data.success === false) setError("Movie not found");
      else {
        const tmp = data.results
          .filter((m) => m.official && m.site.toLowerCase() === "youtube")
          .splice(0, 3);
        setVideos(tmp);
      }
    };
    const getMovieCrew = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=9548c19ec4f1f2218d88c267b59e3806`
      );

      const data = await res.json();
      if (data.success === false) setError("Movie not found");
      else {
        setCast(data.cast.splice(0, 11));
        setCrew(data.crew);
      }
    };

    if (movie && movie.id != id && !error) {
      setMovie(null);
      setVideos(null);
      setCast(null);
      setCrew(null);
      setDirector(null);
      setScreenplay(null);
      setStory(null);
    }
    if (!movie && id) {
      getMovieDatas();
    }
    if (!crew && id && !error) {
      getMovieCrew();
    }
    if (!videos && id && !error) {
      getMovieVideos();
    }
    if (crew && !director && !error) {
      const crewcopy = [...crew];
      const tmp = crewcopy.filter((c) => c.job === "Director")[0];
      if (tmp) setDirector(tmp.original_name);
      else setDirector("unknown");
    }
    if (crew && !story && !error) {
      const crewcopy = [...crew];
      setStory(crewcopy.filter((c) => c.job === "Story"));
    }
    if (crew && !screenplay && story && !error) {
      const crewcopy = [...crew];
      const tmp = crewcopy.filter((c) => {
        let ret = true;
        if (c.job === "Screenplay") {
          story.map((s) => {
            if (s.original_name === c.original_name) ret = false;
            return s;
          });
        } else {
          return false;
        }
        return ret;
      })[0];
      if (tmp) setScreenplay(tmp.original_name);
      else setScreenplay("unknown");
    }
  });

  if (movie) {
    const genders = movie.genres.map((g, i) => {
      return (
        <p className={detailsStyle.gender} key={i}>
          {i !== 0 ? "," : false} {g.name}
        </p>
      );
    });
    return (
      <div className={detailsStyle.details}>
        <div
          className={detailsStyle.blurredBack}
          style={{
            background: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
          }}
        ></div>
        <Layout>
          <div className={detailsStyle.content}>
            <div className={detailsStyle.top}>
              <div className={detailsStyle.left}>
                <h2>
                  {movie.title}{" "}
                  <span>({movie.release_date.split("-")[0]})</span>
                </h2>
                <div className={detailsStyle.allGenders}>{genders}</div>
                <div className={detailsStyle.durationContainer}>
                  <p className={detailsStyle.duration}>
                    {convertMinutes(movie.runtime)}
                  </p>
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
                  <span className={detailsStyle.votePercent}>
                    {convertNoteToPercent(movie.vote_average)}%
                  </span>
                </div>
                <div className={detailsStyle.btnContainer}>
                  <Button
                    style={BTN_STYLE.PLAIN}
                    value={"Regarder"}
                    link={"#"}
                  />
                  <Button
                    style={BTN_STYLE.EMPTY}
                    value={<StarRating numItems={1} size={22} value={0} />}
                    link={"#"}
                  />
                </div>
                <div className={detailsStyle.movieInfos}>
                  <h3>Synopsis</h3>
                  <p className={detailsStyle.synopsis}>{movie.overview}</p>
                  <div className={detailsStyle.crew}>
                    <div className={detailsStyle.crewColumn}>
                      <div className={detailsStyle.crewName}>
                        <h4>Screenplay, Story</h4>
                        <p>
                          {story
                            ? story[0]
                              ? story[0].original_name
                              : "unknown"
                            : "unknown"}
                        </p>
                      </div>
                      <div className={detailsStyle.crewName}>
                        <h4>Screenplay, Story</h4>
                        <p>
                          {story
                            ? story[1]
                              ? story[1].original_name
                              : "unknown"
                            : "unknown"}
                        </p>
                      </div>
                    </div>
                    <div className={detailsStyle.castColumn}>
                      <div className={detailsStyle.crewName}>
                        <h4>Director</h4>
                        <p>{director ?? "unknown"}</p>
                      </div>
                      <div className={detailsStyle.crewName}>
                        <h4>Screenplay</h4>
                        <p>{screenplay ?? "unknown"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className={detailsStyle.movieImg}
                />
              </div>
            </div>

            <div className={detailsStyle.videosContainer}>
              <h2>Bandes annonces</h2>
              <ul>
                {videos && videos.length > 0 ? generateVideosElements() : false}
              </ul>
            </div>
            <div className={detailsStyle.castingContainer}>
              <h2>Casting</h2>
              {cast ? <Cast cast={cast} /> : false}
            </div>
          </div>
        </Layout>
      </div>
    );
  } else {
    if (error) {
      return (
        <Layout>
          <div className={detailsStyle.loading}>
            <p>{error}</p>
          </div>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <div className={detailsStyle.loading}>{<Loading />}</div>
        </Layout>
      );
    }
  }
}
