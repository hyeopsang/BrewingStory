import { Timestamp } from 'firebase/firestore';

export const formattedTime = (timestamp: any) => {
  if (!timestamp) return '';

  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toLocaleString();
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    console.error('Invalid timestamp:', timestamp);
    return 'Invalid Date';
  }

  return date.toLocaleString();
};
