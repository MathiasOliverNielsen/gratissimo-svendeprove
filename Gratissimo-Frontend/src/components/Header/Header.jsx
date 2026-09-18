import { NavLink } from "react-router";
import { Navigation } from "../navigation/Navigation";
import styles from "./Header.module.scss";
import logo from "../../assets/logo/logo-white.png";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <NavLink to="/">
          <figure className={styles.logo}>
            <img src={logo} alt="Gratissimo" />
          </figure>
        </NavLink>

        {/* Navigation */}
        <Navigation />
      </div>
    </header>
  );
}
