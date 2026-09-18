import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import styles from "./TestimonialsSlider.module.scss";

export function TestimonialsSlider() {
  const { data: testimonials } = useFetch(`${import.meta.env.VITE_API_URL}/testimony`);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className={styles.testimonialSlider}>
      <div className={styles.sliderContainer}>
        <div className={styles.testimonialCard}>
          <h2 className={styles.testimonialHeading}>{current.heading || current.title}</h2>
          {current.text && <p className={styles.testimonialText}>{current.text}</p>}
          <div className={styles.testimonialAuthor}>
            <p className={styles.authorName}>{current.name}</p>
            {current.title && <p className={styles.authorTitle}>{current.title}</p>}
          </div>
        </div>
      </div>

      <div className={styles.dotsContainer}>
        {testimonials.map((_, index) => (
          <button key={index} className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`} onClick={() => handleDotClick(index)} aria-label={`Go to testimonial ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}
