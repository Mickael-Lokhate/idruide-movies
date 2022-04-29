import heroesStyle from "./heroes.module.scss";
import { Button } from "baseui/button";

export default function Heroes({ heroes }) {
  return (
    <div className={heroesStyle.heroesContainer}>
      <div className={heroesStyle.hero}>
        <div className={heroesStyle.test}>
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
                  background-size: cover;
                }
              `}
            </style>
            <div className={heroesStyle.infos}>
              <div className={heroesStyle.btnContainer}>
                <button className={heroesStyle.btnWatch}>Regarder</button>
                <button className={heroesStyle.btnMore}>En savoir plus</button>
              </div>
              <h1>{heroes[0].original_title}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={heroesStyle.hero}></div>
      <div className={heroesStyle.hero}></div>
    </div>
  );
}
