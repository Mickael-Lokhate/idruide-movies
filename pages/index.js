import Heroes from "../components/heroes";
import Layout from "../components/layout";
import homeStyle from "./index.module.scss";

export default function Home({ data }) {
  const heroes = data.results.slice(0, 3);
  console.log(heroes);
  return (
    <div className={homeStyle.home}>
      <Layout>
        <Heroes heroes={heroes} />
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=9548c19ec4f1f2218d88c267b59e3806`
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
