import M from "minimatch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Movie } from "../../components/carousel";
import Layout from "../../components/layout";
import { Loading } from "../movie/[id]";

import searchStyle from "./search.module.scss";

export default function SearchPage() {
  const router = useRouter();
  const { value } = router.query;
  const [movies, setMovies] = useState(null);
  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    console.log(value);
    const getMovies = async (page, prev) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=9548c19ec4f1f2218d88c267b59e3806&query=${value}&page=${page}`
      );
      const data = await res.json();
      const results = [...prev, ...data.results];

      if (!totalResult) setTotalResult(data.total_results);
      if (page < data.total_pages) {
        return getMovies(page + 1, results);
      } else {
        setMovies(results);
        return results;
      }
    };
    if (value) {
      getMovies(1, []);
    }
  }, [value]);

  return (
    <div className={searchStyle.search}>
      <Layout>
        <div className={searchStyle.header}>
          <h2 className={searchStyle.title}>{value}</h2>
          <p>{totalResult} résultats</p>
        </div>
        <div className={searchStyle.container}>
          {movies ? (
            movies.length > 0 ? (
              movies.map((m, i) => {
                return <Movie movie={m} key={i} />;
              })
            ) : (
              <div className={searchStyle.loading}>{<Loading />}</div>
            )
          ) : (
            false
          )}
        </div>
      </Layout>
    </div>
  );
}
