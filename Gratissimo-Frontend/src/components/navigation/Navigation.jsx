import { NavLink } from "react-router";
import { FlexContainer } from "../FlexContainer/FlexContainer";
import styles from "./Navigation.module.scss";

export function Navigation() {
  return (
    <nav>
      {/* First UL */}
      <FlexContainer justify="space-between" gap="2rem">
        <ul className={styles.navGroup}>
          <FlexContainer gap="2rem">
            <li>
              <NavLink to="/search">Alle jobs</NavLink>
            </li>
            <li>
              <NavLink to="/create-ad">Opret annonce</NavLink>
            </li>
            <li>
              <NavLink to="/news">Nyheder</NavLink>
            </li>
          </FlexContainer>
        </ul>

        {/* Second UL */}
        <ul className={styles.navGroup}>
          <FlexContainer gap="1.1rem">
            <li>
              <NavLink to="/signup">Opret profil</NavLink>
            </li>
            <li className={styles.specialSign}>|</li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </FlexContainer>
        </ul>
      </FlexContainer>
    </nav>
  );
}
