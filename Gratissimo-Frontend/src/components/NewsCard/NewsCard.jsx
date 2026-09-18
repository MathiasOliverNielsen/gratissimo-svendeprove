import styles from "./NewsCard.module.scss";

export function NewsCard({ article, onClick }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const baseURL = API_URL.replace("/api", "");
  const imageUrl = article.imageUrl.startsWith("http") ? article.imageUrl : `${baseURL}${article.imageUrl}`;

  const formattedDate = new Date(article.createdAt).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <figure className={styles.newsCard} onClick={onClick}>
      <img src={imageUrl} alt={article.title} />
      <figcaption className={styles.newsCardCaption}>
        <div className={styles.newsCardMeta}>
          <p className={styles.date}>{formattedDate}</p>
          <p className={styles.author}>
            <strong>{article.author}</strong>
          </p>
        </div>
        <h4>{article.title}</h4>
      </figcaption>
    </figure>
  );
}
