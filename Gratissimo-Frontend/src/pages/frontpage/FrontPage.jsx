import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { SearchFilter } from "../../components/SearchFilter/SearchFilter";
import styles from "./FrontPage.module.scss";
import { GridContainer } from "../../components/GridContainer/GridContainer";

export default function FrontPage() {
  const navigate = useNavigate();

  // Fetch data
  const { data: jobs } = useFetch("http://localhost:4000/api/job-listings");
  const { data: categories } = useFetch("http://localhost:4000/api/job-categories");

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
    <main className={styles.frontpage}>
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
    </main>
  );
}
