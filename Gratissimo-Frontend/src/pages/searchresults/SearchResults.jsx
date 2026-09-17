import { useLocation } from "react-router";
import { SearchFilter } from "../../components/SearchFilter/SearchFilter";
import { JobAdvertisementCard } from "../../components/JobAdvertisementCard/JobAdvertisementCard";
import styles from "./SearchResults.module.scss";
import { useFetch } from "../../hooks/useFetch";

export default function SearchResults() {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  // Fetch all jobs if no results passed
  const { data: jobs } = useFetch("http://localhost:4000/api/job-listings");
  const displayResults = results.length > 0 ? results : jobs;

  const handleSave = (jobId) => {
    console.log("Save job:", jobId);
    // TODO: implement save functionality
  };

  return (
    <main className={styles.searchResults}>
      <SearchFilter />

      <section className={styles.resultsSection}>
        <h2>Søgeresultater ({displayResults?.length || 0})</h2>

        {!displayResults || displayResults.length === 0 ? <p>Ingen resultater fundet</p> : displayResults.map((job) => <JobAdvertisementCard key={job.id} job={job} onSave={handleSave} onView={handleView} />)}
      </section>
    </main>
  );
}
