import heroesStyle from "./heroes.module.scss";
import Link from "next/link";
import Button, { BTN_STYLE } from "./button";

export default function Heroes({ heroes }) {
  const releaseYear = heroes[0].release_date.split("-")[0];
  return (
    <div className={heroesStyle.heroesContainer}>
      <div className={heroesStyle.content + " content"}>
        <style jsx>
          {`
            .content {
              background: linear-gradient(
                  180deg,
                  rgba(0, 0, 0, 0) 53%,
                  rgba(42, 42, 42, 0.8) 100%
                ),
                url(https://image.tmdb.org/t/p/original/${heroes[0]
                  .poster_path});
              background-repeat: no-repeat;
              background-size: auto;
              background-position: center;
            }
          `}
        </style>
        <div className={heroesStyle.infos}>
          <h1>
            {heroes[0].original_title}{" "}
            <span className={heroesStyle.year}>({releaseYear})</span>
          </h1>
          <div className={heroesStyle.btnContainer}>
            <Button style={BTN_STYLE.PLAIN} value={"Regarder"} link={"/"} />
            <Button
              style={BTN_STYLE.EMPTY}
              value={"En savoir plus"}
              link={`/movie/${heroes[0].id}`}
            />
          </div>
        </div>
      </div>
      <div className={heroesStyle.hero}></div>
      <div className={heroesStyle.hero}></div>
    </div>
  );
}
