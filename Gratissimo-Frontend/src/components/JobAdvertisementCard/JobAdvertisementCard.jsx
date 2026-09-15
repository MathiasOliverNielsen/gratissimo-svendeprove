import { Card } from '../Card/Card';
import { FlexContainer } from '../FlexContainer/FlexContainer';
import { Button } from '../Button/Button';
import styles from './JobAdvertisementCard.module.scss';

export function JobAdvertisementCard({ job, onSave, onView }) {
  const formattedDate = new Date(job.createdAt).toLocaleDateString('da-DK');
  
  return (
    <Card className={styles.jobAdvertisementCard}>
      {/* Header */}
      <div className={styles.header}>
        <h3>{job.title}</h3>
        <p className={styles.category}>{job.jobCategory?.name}</p>
      </div>

      {/* Organization */}
      <p className={styles.organization}>{job.organization}</p>

      {/* Description */}
      <p className={styles.description}>{job.description}</p>

      {/* Details */}
      <FlexContainer gap="$spacing-md" wrap={true}>
        <span className={styles.detail}>{job.city}</span>
        <span className={styles.detail}>{job.workHome}</span>
        <span className={styles.detail}>{job.workType?.type}</span>
        <span className={styles.detail}>{formattedDate}</span>
      </FlexContainer>

      {/* Actions */}
      <FlexContainer gap="$spacing-md" justify="flex-end">
        <Button 
          onClick={() => onSave?.(job.id)}
          variant="secondary"
          size="sm"
        >
          Gem
        </Button>
        <Button 
          onClick={() => onView?.(job.id)}
          variant="primary"
          size="sm"
        >
          Se job
        </Button>
      </FlexContainer>
    </Card>
  );
}
