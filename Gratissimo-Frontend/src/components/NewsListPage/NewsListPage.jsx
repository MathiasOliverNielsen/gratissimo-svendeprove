import { useNavigate } from "react-router";
import { useArticles } from "../../hooks/useArticles";
import { NewsCard } from "../../components/NewsCard/NewsCard";
import { GridContainer } from "../../components/GridContainer/GridContainer";
import styles from "./NewsListPage.module.scss";

export default function NewsListPage() {
  const navigate = useNavigate();
  const { articles } = useArticles();

  // All articles except article 3
  const allArticles = articles?.filter((a) => a.id !== 3) || [];

  return (
    <main className={styles.newsListPage}>
      <h1>Alle artikler</h1>
      <GridContainer columns={3} gap="$spacing-md" autoFit={false}>
        {allArticles.map((article) => (
          <NewsCard key={article.id} article={article} onClick={() => navigate(`/news/${article.id}`)} />
        ))}
      </GridContainer>
    </main>
  );
}
