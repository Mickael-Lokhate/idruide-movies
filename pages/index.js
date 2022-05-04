import Carousel from "../components/carousel";
import Heroes from "../components/heroes";
import Layout from "../components/layout";
import homeStyle from "./index.module.scss";

export default function Home({ trend, last_released, top_rated }) {
  const heroes = trend.results.slice(0, 3);
  const lastReleased = last_released.results;
  const topRated = top_rated.results;
  console.log(heroes);
  console.log(lastReleased);
  console.log(topRated);
  return (
    <div className={homeStyle.home}>
      <Layout>
        <Heroes heroes={heroes} />
        <Carousel title="A l'affiche cette semaine" data={lastReleased} />
        <Carousel title="Les films les mieux notés" data={topRated} />
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const trend = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=9548c19ec4f1f2218d88c267b59e3806`
  );
  const lastReleased = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=9548c19ec4f1f2218d88c267b59e3806`
  );
  const topRated = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=9548c19ec4f1f2218d88c267b59e3806`
  );
  const data = await trend.json();
  const dataLastReleased = await lastReleased.json();
  const dataTopRated = await topRated.json();
  return {
    props: {
      trend: data,
      last_released: dataLastReleased,
      top_rated: dataTopRated,
    },
  };
}
