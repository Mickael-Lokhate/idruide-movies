import heroesStyle from "./heroes.module.scss";
import Link from "next/link";
import Button, { BTN_STYLE } from "./button";
import { useEffect, useRef, useState } from "react";

function Heroe({ heroe }) {
  const releaseYear = heroe.release_date
    ? heroe.release_date.split("-")[0]
    : "0000";
  return (
    <div className={heroesStyle.heroe}>
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
    </div>
  );
}

function SliderButtons({ onClick, active }) {
  const index = [0, 1, 2];
  return (
    <ul className={heroesStyle.btnSliderContainer}>
      {index.map((id) => {
        if (id == active)
          return (
            <li
              id={id}
              className={`${heroesStyle.btnSlider} ${heroesStyle.active}`}
              onClick={onClick}
              key={id}
            ></li>
          );
        return (
          <li
            key={id}
            id={id}
            className={`${heroesStyle.btnSlider}`}
            onClick={onClick}
          ></li>
        );
      })}
    </ul>
  );
}

export default function Heroes({ heroes }) {
  const [currentHeroe, setCurrentHeroe] = useState(heroes[0]);
  let index = 0;
  const [active, setActive] = useState(0);
  const timeoutID = useRef();
  const generateHeroe = () => {
    if (index >= heroes.length) {
      setCurrentHeroe(heroes[0]);
      index = 0;
      setActive(0);
      return;
    }
    setCurrentHeroe(heroes[index]);
    index++;
    setActive(index);
    return;
  };

  const handleSlide = (e) => {
    const id = Number(e.target.id);
    if (id && id >= 0 && id < heroes.length) {
      setCurrentHeroe(heroes[id]);
      index = id;
      setActive(id);
    }
  };

  useEffect(() => {
    timeoutID.current = setInterval(generateHeroe, 2500);
    return () => clearInterval(timeoutID.current);
  }, []);
  return (
    <>
      <div className={heroesStyle.heroesContainer}>
        <Heroe heroe={currentHeroe} />;
      </div>
      <SliderButtons
        onClick={handleSlide}
        active={active === 0 ? active : active - 1}
      />
    </>
  );
}
