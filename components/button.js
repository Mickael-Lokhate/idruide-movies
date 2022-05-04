import Link from "next/link";
import buttonStyle from "./button.module.scss";

export default function Button({ value, style, link }) {
  if (style === BTN_STYLE.PLAIN)
    return (
      <Link href={link}>
        <button className={buttonStyle.plain}>{value}</button>
      </Link>
    );
  return (
    <Link href={link}>
      <button className={buttonStyle.empty}>{value}</button>
    </Link>
  );
}

export const BTN_STYLE = {
  PLAIN: 0,
  EMPTY: 1,
};
