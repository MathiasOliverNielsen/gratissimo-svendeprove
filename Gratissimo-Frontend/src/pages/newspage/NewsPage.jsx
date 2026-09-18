import { useParams, useNavigate } from "react-router";
import { useArticles } from "../../hooks/useArticles";
import { NewsCard } from "../../components/NewsCard/NewsCard";
import { GridContainer } from "../../components/GridContainer/GridContainer";
import styles from "./NewsPage.module.scss";

export default function NewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles, getArticleById } = useArticles();

  const article = getArticleById(id);
  if (!article) return <p>Article not found</p>;

  const formattedDate = article.createdAt.split("T")[0];
  const allOtherArticles = articles?.filter((a) => a.id !== article.id && a.id !== 3) || [];

  const API_URL = import.meta.env.VITE_API_URL;
  const baseURL = API_URL.replace("/api", "");
  const imageUrl = article.imageUrl.startsWith("http") ? article.imageUrl : `${baseURL}${article.imageUrl}`;

  return (
    <main className={styles.newsPage}>
      {/* Detail article - rendered directly */}
      <article className={styles.articleDetail}>
        <img src={imageUrl} alt={article.title} className={styles.image} />
        <div className={styles.content}>
          <h1>{article.title}</h1>
          <div className={styles.articleInfo}>
            <p>
              <strong>{article.author}</strong>
            </p>
            <p>{formattedDate}</p>
          </div>
          <p className={styles.contentText}>{article.content}</p>
        </div>
      </article>

      {/* All other articles grid */}
      <section className={styles.allArticles}>
        <h2>Alle nyheder</h2>
        <GridContainer columns={3} gap="2rem" autoFit={false}>
          {allOtherArticles.map((a) => (
            <NewsCard key={a.id} article={a} onClick={() => navigate(`/news/${a.id}`)} />
          ))}
        </GridContainer>
      </section>
    </main>
  );
}
