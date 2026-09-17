import { useState } from "react";
import { useNavigate } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { FlexContainer } from "../FlexContainer/FlexContainer";
import { InputField } from "../InputField/InputField";
import { Button } from "../Button/Button";
import styles from "./SearchFilter.module.scss";

export function SearchFilter() {
  const navigate = useNavigate();

  // === FETCH DATA ===
  const { data: jobs, loading: jobsLoading } = useFetch("http://localhost:4000/api/job-listings");
  const { data: workTypes } = useFetch("http://localhost:4000/api/workTypes");
  const { data: categories } = useFetch("http://localhost:4000/api/job-categories");

  const regions = jobs ? [...new Map(jobs.map((job) => [job.region.id, job.region])).values()] : [];

  // === STATE FOR FILTERS ===
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    region: null,
    jobCategoryId: null,
    workType: null,
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
      region: null,
      category: null,
      workType: null,
      workHome: null,
      period: null,
    });
  };

  return (
    <section className={styles.searchFilter}>
      {/* Search Input */}
      <div className={styles.searchSection}>
        <InputField type="text" placeholder="Eks. cafémedhjælper..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <Button onClick={handleSearch} variant="primary">
          Søg
        </Button>
      </div>

      {/* Filters */}
      <div className={styles.filtersSection}>
        <label>Filter:</label>

        {/* Region Filter */}
        <select value={filters.regionId || ""} onChange={(e) => setFilters({ ...filters, regionId: e.target.value || null })}>
          {" "}
          <option value="">Region</option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select value={filters.jobCategoryId || ""} onChange={(e) => setFilters({ ...filters, jobCategoryId: e.target.value || null })}>
          <option value="">Kategori</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Work Type Filter */}
        <select value={filters.workTypeId || ""} onChange={(e) => setFilters({ ...filters, workType: e.target.value || null })}>
          <option value="">Arbejdstid</option>
          {workTypes?.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type}
            </option>
          ))}
        </select>

        {/* Period Filter */}
        <select value={filters.period || ""} onChange={(e) => setFilters({ ...filters, period: e.target.value || null })}>
          <option value="">Periode</option>
          <option value="week">Seneste uge</option>
          <option value="month">Seneste måned</option>
          <option value="year">Seneste år</option>
        </select>

        {/* Work Home Filter */}
        <select value={filters.workHome || ""} onChange={(e) => setFilters({ ...filters, workHome: e.target.value || null })}>
          <option value="Arbejdsplads">Arbejdsplads</option>
          <option value="">Hjemmearbejde</option>
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        {/* Reset Button */}
        <Button onClick={handleReset} variant="secondary">
          Nulstil
        </Button>
      </div>
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
    if (filters.regionId && job.regionId !== parseInt(filters.regionId)) return false;

    // Category filter
    if (filters.jobCategoryId && job.jobCategoryId !== parseInt(filters.jobCategoryId)) return false;

    // Work Type filter
    if (filters.workType && job.workTypeId !== parseInt(filters.workType)) return false;

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
