import { Input } from "baseui/input";
import headerStyle from "./header.module.scss";

export default function Header() {
  return (
    <header className={headerStyle.header}>
      <h1 className={headerStyle.title}>MOVIENIGHT</h1>
      <input
        type="search"
        className={headerStyle.searchInput}
        placeholder="Rechercher un film, un réalisateur, un acteur"
      />
    </header>
  );
}
