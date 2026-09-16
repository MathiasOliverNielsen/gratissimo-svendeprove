import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { SearchFilter } from "../../components/SearchFilter/SearchFilter";
import styles from "./FrontPage.module.scss";
import { GridContainer } from "../../components/GridContainer/GridContainer";
import { useArticles } from "../../hooks/useArticles";
import { NewsCard } from "../../components/NewsCard/NewsCard";

export default function FrontPage() {
  const navigate = useNavigate();
  const { articles } = useArticles();

  // Fetch data
  const { data: jobs } = useFetch("http://localhost:4000/api/job-listings");
  const { data: categories } = useFetch("http://localhost:4000/api/job-categories");

  // Pick 3 random articles but slice out article 3 cause no img in backend
  const randomArticles =
    articles
      ?.filter((a) => a.id !== 3)
      ?.sort(() => Math.random() - 0.5)
      .slice(0, 3) || [];

  // Count jobs per category
  const categoryCounts = useMemo(() => {
    if (!jobs || !categories) return {};

    const counts = {};
    categories.forEach((cat) => {
      counts[cat.id] = jobs.filter((job) => job.jobCategoryId === cat.id).length;
    });
    return counts;
  }, [jobs, categories]);

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    const categoryName = categories.find((c) => c.id === categoryId)?.name;
    const filtered = jobs.filter((job) => job.jobCategoryId === categoryId);

    navigate("/search", {
      state: {
        filters: { jobCategoryId: categoryId },
        searchText: "",
        results: filtered,
      },
    });
  };

  return (
    <>
      <SearchFilter />
      <h2>Find job ved kategori</h2>
      {/* Category Grid */}
      <section className={styles.categorySection}>
        <GridContainer columns={3} gap="$spacing-md" autoFit={false}>
          {categories?.map((category) => (
            <div key={category.id} className={styles.categoryCard} onClick={() => handleCategoryClick(category.id)}>
              <p className={styles.categoryName}>{category.name}</p>
              <p className={styles.categoryCount}>{categoryCounts[category.id] || 0}</p>
            </div>
          ))}
        </GridContainer>
      </section>
      <section className={styles.newsSection}>
        <h2>Udvalgte Nyheder</h2>
        <GridContainer columns={3} gap="$spacing-md" autoFit={false}>
          {randomArticles.map((article) => (
            <NewsCard key={article.id} article={article} onClick={() => navigate(`/news/${article.id}`)} />
          ))}
        </GridContainer>
      </section>
    </>
  );
}
