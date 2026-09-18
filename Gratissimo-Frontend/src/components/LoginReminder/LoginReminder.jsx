import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import styles from "./LoginReminder.module.scss";

export function LoginReminder() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.reminder}>
      <span>Vi hjælper dig på vej til dit næste frivillige job</span>
      <button onClick={() => navigate("/login")} className={styles.button}>
        Log ind eller opret dig
      </button>
    </div>
  );
}
