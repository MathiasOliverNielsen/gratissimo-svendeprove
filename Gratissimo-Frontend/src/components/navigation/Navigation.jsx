import { NavLink, useNavigate } from "react-router";
import { FlexContainer } from "../FlexContainer/FlexContainer";
import styles from "./Navigation.module.scss";
import { useAuthContext } from "../../context/AuthContext";

export function Navigation() {
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();
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
            {isAuthenticated ? (
              <>
                <li>
                  <NavLink to="/mypage">Min side</NavLink>
                </li>
                <li>
                  <button
                    className={styles.logoutButton}
                    onClick={() => {
                      // Call the logout function from useAuth
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
                  <NavLink to="/signup">Opret profil</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </FlexContainer>
        </ul>
      </FlexContainer>
    </nav>
  );
}
