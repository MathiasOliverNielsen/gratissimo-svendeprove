import { useNavigate } from "react-router";
import styles from "./SaveFavoriteModal.module.scss";

export function SaveFavoriteModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLoginClick = () => {
    navigate("/login");
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <h2>Log ind for at gemme jobopslag</h2>
        <p>Du skal være logget ind for at gemme jobopslag til dine favoritter.</p>

        <button className={styles.loginButton} onClick={handleLoginClick}>
          Gå til login
        </button>
      </div>
    </div>
  );
}
