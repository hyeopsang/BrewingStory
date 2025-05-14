export interface ReviewContent {
  taste: number;
  mood: number;
  kind: number;
  comfort: number;
  wifi: number;
  parking: number;
  text: string;
  placeName: string;
}
export interface Review {
  id: string;
  placeId: string;
  content: ReviewContent;
  createdAt: Date;
  userId: string;
}
