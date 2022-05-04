import { Input } from "baseui/input";
import Link from "next/link";
import headerStyle from "./header.module.scss";

export default function Header() {
  return (
    <header className={headerStyle.header}>
      <Link href="/">
        <h1 className={headerStyle.title}>MOVIENIGHT</h1>
      </Link>
      <input
        type="search"
        className={headerStyle.searchInput}
        placeholder="Rechercher un film, un réalisateur, un acteur"
      />
    </header>
  );
}
