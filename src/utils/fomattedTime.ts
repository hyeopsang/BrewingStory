import { Timestamp } from "firebase/firestore";

export const formattedTime = (timestamp: any) => {
  if (!timestamp) return "";

  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toLocaleString(); // Firestore Timestamp → JS Date 변환
  }

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    console.error("Invalid timestamp:", timestamp);
    return "Invalid Date";
  }

  return date.toLocaleString();
};
