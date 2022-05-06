import heroesStyle from "./heroes.module.scss";
import Link from "next/link";
import Button, { BTN_STYLE } from "./button";

function Heroe({ heroe }) {
  const releaseYear = heroe.release_date
    ? heroe.release_date.split("-")[0]
    : "0000";
  return (
    <>
      <div className={heroesStyle.blurBgImg}>
        <img
          className={heroesStyle.blurImg}
          src={`https://image.tmdb.org/t/p/original/${heroe.backdrop_path}`}
        />
      </div>
      <div className={heroesStyle.content}>
        <div className={heroesStyle.infos}>
          <img
            className={heroesStyle.img}
            src={`https://image.tmdb.org/t/p/original/${heroe.backdrop_path}`}
          />
          <h1>
            {heroe.original_title}{" "}
            <span className={heroesStyle.year}>({releaseYear})</span>
          </h1>
          <div className={heroesStyle.btnContainer}>
            <Button style={BTN_STYLE.PLAIN} value={"Regarder"} link={"#"} />
            <Button
              style={BTN_STYLE.EMPTY}
              value={"En savoir plus"}
              link={`/movie/${heroe.id}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function Heroes({ heroes }) {
  const heroesElements = heroes.map((h) => <Heroe heroe={h} />);
  return <div className={heroesStyle.heroesContainer}>{heroesElements}</div>;
}
