import Link from "next/link";
import headerStyle from "./header.module.scss";
import { Search } from "baseui/icon";
import { useState } from "react";
import ArrowRight from "baseui/icon/arrow-right";

export default function Header() {
  const [searchVal, setSearch] = useState("");
  const [movies, setMovies] = useState(null);

  const generateElements = () => {
    return movies.map((m, i) => {
      return (
        <Link
          href={`/movie/${m.id}`}
          key={i}
          className={headerStyle.movieLink}
          onClick={() => setSearch("")}
        >
          <div className={headerStyle.movieContainer}>
            <li className={headerStyle.movie}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${m.poster_path}`}
                className={headerStyle.movieImg}
              />
              <div className={headerStyle.movieInfos}>
                <h5>{m.original_title}</h5>
                <p>{m.release_date ? m.release_date.split("-")[0] : "0000"}</p>
              </div>
            </li>
            <ArrowRight className={headerStyle.arrowIcon} size={24} />
          </div>
        </Link>
      );
    });
  };

  const handleSearch = async (e) => {
    const val = e.target.value;
    setSearch(val);
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=9548c19ec4f1f2218d88c267b59e3806&query=${val}`
    );
    const data = await res.json();
    const results = data.results;
    setMovies(results);
  };

  return (
    <header className={headerStyle.header}>
      <Link href="/">
        <h1 className={headerStyle.title} onClick={() => setSearch("")}>
          MOVIENIGHT
        </h1>
      </Link>
      <div className={headerStyle.inputContainer}>
        <input
          value={searchVal}
          placeholder="Rechercher un film, un réalisateur, un acteur"
          className={headerStyle.searchInput}
          type="search"
          onChange={handleSearch}
        />
        <Search size={24} className={headerStyle.icon} />
        {searchVal ? (
          <div className={headerStyle.suggestions}>
            <div className={headerStyle.top}>
              <p>Affiner votre recherche pour plus de résultat</p>
              <p>{movies ? movies.length : "0"}+ résultats</p>
            </div>
            {movies && movies.length > 0 ? (
              <ul className={headerStyle.list}>{generateElements()}</ul>
            ) : (
              <p>No results.</p>
            )}
            <div className={headerStyle.moreResult}>
              <Link href={`/search/${searchVal}`} onClick={() => setSearch("")}>
                Voir tous les résultats
              </Link>
            </div>
          </div>
        ) : (
          false
        )}
      </div>
    </header>
  );
}
