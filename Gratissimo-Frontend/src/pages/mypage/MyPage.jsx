import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiCall } from "../../utils/api";
import { useAuthContext } from "../../context/AuthContext";
import { JobAdvertisementCard } from "../../components/JobAdvertisementCard/JobAdvertisementCard";
import styles from "./MyPage.module.scss";

export default function MyPage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthContext();
  const [activeTab, setActiveTab] = useState("ads");
  const [userName, setUserName] = useState("");
  const [userAds, setUserAds] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const userInfo = await apiCall("/verify");
        setUserName(userInfo.name || "");

        const allListings = await apiCall("/job-listings");
        const userListings = allListings.filter((listing) => listing.userId === userInfo.userId);
        setUserAds(userListings);

        const userFavorites = await apiCall("/favorites");
        setFavorites(userFavorites);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDeleteAd = async (adId) => {
    if (!window.confirm("Er du sikker på, at du vil slette denne annonce?")) {
      return;
    }

    try {
      await apiCall(`/job-listings/${adId}`, { method: "DELETE" });
      setUserAds((prev) => prev.filter((ad) => ad.id !== adId));
    } catch (error) {
      console.error("Failed to delete ad:", error);
    }
  };

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await apiCall(`/favorites/${favoriteId}`, { method: "DELETE" });
      setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  if (loading) {
    return <main className={styles.myPage}>Indlæser...</main>;
  }

  return (
    <div className={styles.myPage}>
      <header className={styles.header}>
        <div>
          <h1>Velkommen {userName}</h1>
        </div>
        <nav className={styles.headerNav}>
          <a href="/edit-profile" className={styles.link}>
            Rediger Profil
          </a>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Log ud
          </button>
        </nav>
      </header>

      <section className={styles.tabSwitcher}>
        <button className={`${styles.tab} ${activeTab === "ads" ? styles.active : ""}`} onClick={() => setActiveTab("ads")}>
          Mine annoncer
        </button>
        <button className={`${styles.tab} ${activeTab === "favorites" ? styles.active : ""}`} onClick={() => setActiveTab("favorites")}>
          Mine favoritter
        </button>
      </section>

      {activeTab === "ads" && (
        <section className={styles.contentSection}>
          <h2>Mine annoncer</h2>
          {userAds.length === 0 ? (
            <p>Du har ikke oprettet nogen annoncer endnu.</p>
          ) : (
            <div className={styles.resultsList}>
              {userAds.map((ad) => (
                <JobAdvertisementCard
                  key={ad.id}
                  job={ad}
                  onRemove={() => handleDeleteAd(ad.id)}
                  onEdit={() => navigate(`/create-ad?id=${ad.id}`)}
                  hideSave={true}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === "favorites" && (
        <section className={styles.contentSection}>
          <h2>Mine favoritter</h2>
          {favorites.length === 0 ? (
            <p>Du har ikke gemt nogen annoncer som favoritter endnu.</p>
          ) : (
            <div className={styles.resultsList}>
              {favorites.map((fav) => (
                <JobAdvertisementCard key={fav.id} job={fav.jobListing} onRemove={() => handleRemoveFavorite(fav.id)} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
