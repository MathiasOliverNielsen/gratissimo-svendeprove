import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { SearchFilter } from "../../components/SearchFilter/SearchFilter";
import { TestimonialsSlider } from "../../components/TestimonialsSlider/TestimonialsSlider";
import styles from "./FrontPage.module.scss";
import { GridContainer } from "../../components/GridContainer/GridContainer";
import { useArticles } from "../../hooks/useArticles";
import { NewsCard } from "../../components/NewsCard/NewsCard";

export default function FrontPage() {
  const navigate = useNavigate();
  const { articles } = useArticles();

  // Fetch data
  const { data: jobs } = useFetch(`${import.meta.env.VITE_API_URL}/job-listings`);
  const { data: categories } = useFetch(`${import.meta.env.VITE_API_URL}/job-categories`);

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
      <section className={styles.categoryWrapper}>
        <h2>Find job ved kategori</h2>
        <section className={styles.categorySection}>
          <GridContainer columns={3} autoFit={false}>
          {categories?.map((category) => (
            <div key={category.id} className={styles.categoryCard} onClick={() => handleCategoryClick(category.id)}>
              <p className={styles.categoryName}>{category.name}</p>
              <p className={styles.categoryCount}>{categoryCounts[category.id] || 0}</p>
            </div>
          ))}
        </GridContainer>
      </section>
      </section>
      <section className={styles.newsSection}>
        <h2>Udvalgte Nyheder</h2>
        <GridContainer columns={3} gap="2rem" autoFit={false}>
          {randomArticles.map((article) => (
            <NewsCard key={article.id} article={article} onClick={() => navigate(`/news/${article.id}`)} />
          ))}
        </GridContainer>
      </section>
      <TestimonialsSlider />
    </>
  );
}
