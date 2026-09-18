import { useState } from "react";
import { useNavigate } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { FlexContainer } from "../FlexContainer/FlexContainer";
import { InputField } from "../InputField/InputField";
import searchIcon from "../../assets/icons/icons8-search-50.png";
import styles from "./SearchFilter.module.scss";

export function SearchFilter() {
  const navigate = useNavigate();

  // === FETCH DATA ===
  const { data: jobs, loading: jobsLoading } = useFetch(`${import.meta.env.VITE_API_URL}/job-listings`);
  const { data: workTypes } = useFetch(`${import.meta.env.VITE_API_URL}/workTypes`);
  const { data: categories } = useFetch(`${import.meta.env.VITE_API_URL}/job-categories`);

  const regions = jobs ? [...new Map(jobs.map((job) => [job.region.id, job.region])).values()] : [];

  // === STATE FOR FILTERS ===
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    regionId: null,
    jobCategoryId: null,
    workTypeId: null,
    workHome: null,
    period: null,
  });

  // === FILTER LOGIC ===
  const filteredJobs = filterJobs(jobs, searchText, filters);

  // === HANDLE SEARCH ===
  const handleSearch = () => {
    navigate("/search", {
      state: {
        filters,
        searchText,
        results: filteredJobs,
      },
    });
  };

  // === HANDLE RESET ===
  const handleReset = () => {
    setSearchText("");
    setFilters({
      regionId: null,
      jobCategoryId: null,
      workTypeId: null,
      workHome: null,
      period: null,
    });
  };

  return (
    <section className={styles.searchFilter}>
      <header className={styles.header}>
        <h1>Søg frivilligt arbejde:</h1>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <FlexContainer align="center" gap="0">
          <div className={styles.searchInputGroup}>
            <img src={searchIcon} alt="" aria-hidden="true" className={styles.searchIcon} />
            <InputField type="text" placeholder="Eks. cafémedhjælper..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          </div>
          <button type="submit" className={styles.submitButton}>
            Søg
          </button>
        </FlexContainer>
      </form>

      {/* Filters */}
      <fieldset className={styles.filtersSection}>
        <FlexContainer align="center" gap="1rem" wrap={true}>
          <legend>Filter:</legend>
          <label>
            <select value={filters.regionId || ""} onChange={(e) => setFilters({ ...filters, regionId: e.target.value || null })}>
              <option value="">Region</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <select value={filters.jobCategoryId || ""} onChange={(e) => setFilters({ ...filters, jobCategoryId: e.target.value || null })}>
              <option value="">Kategori</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <select value={filters.workTypeId || ""} onChange={(e) => setFilters({ ...filters, workTypeId: e.target.value || null })}>
              <option value="">Arbejdstid</option>
              {workTypes?.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
          </label>

          <label>
            <select value={filters.period || ""} onChange={(e) => setFilters({ ...filters, period: e.target.value || null })}>
              <option value="">Periode</option>
              <option value="week">Seneste uge</option>
              <option value="month">Seneste måned</option>
              <option value="year">Seneste år</option>
            </select>
          </label>

          <label>
            <select value={filters.workHome || ""} onChange={(e) => setFilters({ ...filters, workHome: e.target.value || null })}>
              <option value="Arbejdsplads">Arbejdsplads</option>
              <option value="">Hjemmearbejde</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </label>

          <button type="reset" className={styles.resetButton} onClick={handleReset}>
            Nulstil
          </button>
        </FlexContainer>
      </fieldset>
    </section>
  );
}

// FILTER FUNCTION
function filterJobs(jobs, searchText, filters) {
  if (!jobs) return [];

  return jobs.filter((job) => {
    // Search filter (title + description)
    if (searchText) {
      const search = searchText.toLowerCase();
      const matchesSearch = job.title.toLowerCase().includes(search) || job.description.toLowerCase().includes(search);
      if (!matchesSearch) return false;
    }

    // Region filter
    if (filters.regionId && job.region.id !== parseInt(filters.regionId)) return false;

    // Category filter
    if (filters.jobCategoryId && job.jobCategoryId !== parseInt(filters.jobCategoryId)) return false;

    // Work Type filter
    if (filters.workTypeId && job.workTypeId !== parseInt(filters.workTypeId)) return false;

    // Work Home filter
    if (filters.workHome && job.workHome !== filters.workHome) return false;

    // Period filter (based on createdAt)
    if (filters.period) {
      const today = new Date();
      const jobDate = new Date(job.createdAt);

      let startDate = new Date(today);

      if (filters.period === "week") {
        startDate.setDate(today.getDate() - 7);
      } else if (filters.period === "month") {
        startDate.setDate(today.getDate() - 30);
      } else if (filters.period === "year") {
        startDate.setFullYear(today.getFullYear() - 1);
      }
      console.log("Period:", filters.period);
      console.log("Today:", today);
      console.log("StartDate:", startDate);
      console.log("Job Date:", jobDate);
      console.log("Keep job?", jobDate >= startDate);
      // Keep only jobs created AFTER startDate
      if (jobDate < startDate) {
        return false;
      }
    }

    return true;
  });
}
