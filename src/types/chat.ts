import { Timestamp } from "firebase/firestore";

export type Message = {
  createdAt: Timestamp;
  from: string;
  to: string;
  message: string;
  media: string | null;
  audio: string | null;
};
