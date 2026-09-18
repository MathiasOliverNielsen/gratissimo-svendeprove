import { useState, useEffect } from "react";
import { Card } from "../Card/Card";
import { SaveFavoriteModal } from "../SaveFavoriteModal/SaveFavoriteModal";
import { useAuthContext } from "../../context/AuthContext";
import { saveFavorite, deleteFavorite, apiCall } from "../../utils/api";
import favoriteIcon from "../../assets/icons/icons8-favorite-50.png";
import styles from "./JobAdvertisementCard.module.scss";

export function JobAdvertisementCard({ job, onSave }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const formattedDate = new Date(job.createdAt).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "numeric",
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserFavorites();
    }
  }, [isAuthenticated]);

  const fetchUserFavorites = async () => {
    try {
      const favorites = await apiCall("/favorites");
      const found = favorites.find((fav) => fav.jobListingId === job.id);
      if (found) {
        setIsFavorited(true);
        setFavoriteId(found.id);
      }
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  };

  const handleSaveClick = async () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    if (isLoading || isFavorited) return;

    setIsLoading(true);
    try {
      await saveFavorite(job.id);
      setIsFavorited(true);
      onSave?.(job.id);
    } catch (error) {
      console.error("Failed to save favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveClick = async () => {
    if (!favoriteId || isLoading) return;

    setIsLoading(true);
    try {
      await deleteFavorite(favoriteId);
      setIsFavorited(false);
      setFavoriteId(null);
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isExpanded) {
    return (
      <Card className={styles.jobAdvertisementCardExpanded}>
        <header className={styles.expandedHeader}>
          <section>
            <p className={styles.organizationLabel}>{job.organization}</p>
            <h3>{job.title}</h3>
          </section>
        </header>

        <article className={styles.expandedContent}>
          <section className={styles.contentGrid}>
            <section className={styles.leftColumn}>
              <section className={styles.section}>
                <h4>Kategori</h4>
                <p>{job.jobCategory?.name}</p>
              </section>

              <section className={styles.section}>
                <h4>Beskrivelse</h4>
                <p>{job.description}</p>
              </section>

              <section className={styles.section}>
                <h4>Erfaring</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </section>

              <section className={styles.section}>
                <h4>Arbejdsopgaver</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </section>
            </section>

            <aside className={styles.rightColumn}>
              <section className={styles.metaBox}>
                <p>Location: {job.city}</p>
                <p>Indrykket: d. {formattedDate}</p>
                <p>Arbejdstid: {job.workType?.type}</p>
                <p>Hjemmarbejde: {job.workHome}</p>
              </section>

              <section className={styles.contactSection}>
                <h4>Kontakt</h4>
                <p>{job.organization}</p>
                <p>Tlf: +45 20992099</p>
                <p>Email: job@gratissimo.dk</p>
                <p>Att. Johan Nielson</p>
              </section>
            </aside>
          </section>
        </article>

        <footer className={styles.expandedFooter}>
          {isFavorited ? (
            <button className={styles.removeButton} onClick={handleRemoveClick} disabled={isLoading}>
              <img src={favoriteIcon} alt="Favorit hjerte" className={styles.heartIcon} />
              Fjern
            </button>
          ) : (
            <button className={styles.saveButton} onClick={handleSaveClick} disabled={isLoading}>
              <img src={favoriteIcon} alt="Favorit hjerte" className={styles.heartIcon} />
              Gem
            </button>
          )}
          <button className={styles.closeButton} onClick={() => setIsExpanded(false)}>
            Luk
          </button>
        </footer>

        <SaveFavoriteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Card>
    );
  }

  return (
    <Card className={styles.jobAdvertisementCard}>
      <header className={styles.collapsedHeader}>
        <section>
          <p className={styles.organizationLabel}>{job.organization}</p>
          <h3>{job.title}</h3>
          <p className={styles.description}>{job.description}</p>
        </section>
        <aside className={styles.collapsedMeta}>
          <p>Location: {job.city}</p>
          <p>Indrykket: d. {formattedDate}</p>
        </aside>
      </header>

      <footer className={styles.collapsedFooter}>
        {isFavorited ? (
          <button className={styles.removeButton} onClick={handleRemoveClick} disabled={isLoading}>
            <img src={favoriteIcon} alt="Favorit hjerte" className={styles.heartIcon} />
            Fjern
          </button>
        ) : (
          <button className={styles.saveButton} onClick={handleSaveClick} disabled={isLoading}>
            <img src={favoriteIcon} alt="Favorit hjerte" className={styles.heartIcon} />
            Gem
          </button>
        )}
        <button className={styles.openButton} onClick={() => setIsExpanded(true)}>
          Åben
        </button>
      </footer>

      <SaveFavoriteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Card>
  );
}
