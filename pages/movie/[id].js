import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { convertMinutes } from "../../components/carousel";
import Layout from "../../components/layout";
import detailsStyle from "./details.module.scss";
import { ProgressBar, SIZE } from "baseui/progress-bar";
import Button, { BTN_STYLE } from "../../components/button";
import { StarRating } from "baseui/rating";

function convertNoteToPercent(note) {
  return Math.floor(note * 10);
}

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [crew, setCrew] = useState(null);
  const [director, setDirector] = useState(null);
  const [screenplay, setScreenplay] = useState(null);
  const [story, setStory] = useState(null);

  useEffect(() => {
    const getMovieDatas = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=9548c19ec4f1f2218d88c267b59e3806`
      );

      const data = await res.json();
      setMovie(data);
    };
    const getMovieCrew = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=9548c19ec4f1f2218d88c267b59e3806`
      );

      const data = await res.json();
      setCrew(data);
    };
    if (!movie && id) {
      getMovieDatas();
    }
    if (!crew && id) {
      getMovieCrew();
    }
    if (crew && !director) {
      const crewcopy = { ...crew };
      setDirector(
        crewcopy.crew.filter((c) => c.job === "Director")[0].original_name
      );
    }
    if (crew && !story) {
      const crewcopy = [...crew.crew];
      setStory(crewcopy.filter((c) => c.job === "Story"));
    }
    if (crew && !screenplay && story) {
      const crewcopy = [...crew.crew];
      setScreenplay(
        crewcopy.filter((c) => {
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
        })[0].original_name
      );
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
                    link={"/"}
                  />
                  <Button
                    style={BTN_STYLE.EMPTY}
                    value={<StarRating numItems={1} size={22} value={0} />}
                    link={"/"}
                  />
                </div>
                <div className={detailsStyle.movieInfos}>
                  <h3>Synopsis</h3>
                  <p className={detailsStyle.synopsis}>{movie.overview}</p>
                  <div className={detailsStyle.cast}>
                    <div className={detailsStyle.castRow}>
                      <div className={detailsStyle.castName}>
                        <h4>Screenplay, Story</h4>
                        <p>
                          {story
                            ? story[0]
                              ? story[0].original_name
                              : "unknown"
                            : "unknown"}
                        </p>
                      </div>
                      <div className={detailsStyle.castName}>
                        <h4>Director</h4>
                        <p>{director ?? "unknown"}</p>
                      </div>
                    </div>
                    <div className={detailsStyle.castRow}>
                      <div className={detailsStyle.castName}>
                        <h4>Screenplay, Story</h4>
                        <p>
                          {story
                            ? story[1]
                              ? story[1].original_name
                              : "unknown"
                            : "unknown"}
                        </p>
                      </div>
                      <div className={detailsStyle.castName}>
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
          </div>
        </Layout>
      </div>
    );
  } else {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }
}

// import MovieDetails from "./movie_details";

// export default function Test({ data }) {
//   return <MovieDetails data={data} />;
// }

// export async function getStaticProps({ params }) {
//   console.log(params);
//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/${params.id}?api_key=9548c19ec4f1f2218d88c267b59e3806`
//   );

//   const data = await res.json();
//   return {
//     props: {
//       data,
//     },
//   };
// }
