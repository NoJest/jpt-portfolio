import Link from 'next/link';
import styles from './ItemDescription.module.css';

interface ItemDescriptionProps {
  item: {
    title: string;
    description: string;
    tags: string[];
    url?: string;
  };
  isList?: boolean;
}

export function ItemDescription({ item, isList = false }: ItemDescriptionProps) {
  return (
    <div className={`${styles.description} ${isList ? styles.listView : ''}`}>
      <h2>
        {item.url ? (
          <Link href={item.url} target="_blank" rel="noopener noreferrer">
            {item.title} <span aria-hidden="true">↗</span>
          </Link>
        ) : (
          item.title
        )}
      </h2>
      <p>{item.description}</p>
      <div className={styles.tags}>
        {item.tags.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
      {item.url && !isList && (
        <Link 
          href={item.url} 
          target="_blank"
          rel="noopener noreferrer"
          className={styles.projectLink}
        >
          View Project
        </Link>
      )}
    </div>
  );
}