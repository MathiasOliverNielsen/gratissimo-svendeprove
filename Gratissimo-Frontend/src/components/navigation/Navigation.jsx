import { NavLink, useNavigate } from "react-router";
import { FlexContainer } from "../FlexContainer/FlexContainer";
import styles from "./Navigation.module.scss";
import { useAuthContext } from "../../context/AuthContext";

export function Navigation() {
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();
  return (
    <nav>
      <FlexContainer justify="space-between" gap="2rem">
        <ul className={styles.navGroup}>
          <FlexContainer gap="2rem">
            <li>
              <NavLink to="/search" className={({ isActive }) => isActive ? styles.active : ""}>Alle jobs</NavLink>
            </li>
            <li>
              <NavLink to="/create-ad" className={({ isActive }) => isActive ? styles.active : ""}>Opret annonce</NavLink>
            </li>
            <li>
              <NavLink to="/news" className={({ isActive }) => isActive ? styles.active : ""}>Nyheder</NavLink>
            </li>
          </FlexContainer>
        </ul>

        <ul className={styles.navGroup}>
          <FlexContainer gap="1.1rem">
            {isAuthenticated ? (
              <>
                <li>
                  <NavLink to="/mypage" className={({ isActive }) => isActive ? styles.active : ""}>Min side</NavLink>
                </li>
                <li>
                  <button
                    className={styles.logoutButton}
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    Log ud
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/signup" className={({ isActive }) => isActive ? styles.active : ""}>Opret profil</NavLink>
                </li>
                <li>
                  <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : ""}>Login</NavLink>
                </li>
              </>
            )}
          </FlexContainer>
        </ul>
      </FlexContainer>
    </nav>
  );
}
