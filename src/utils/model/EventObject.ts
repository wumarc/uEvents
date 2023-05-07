import { Timestamp } from "firebase/firestore";

export type EventObject = {

    name: string;
    description: string;
    num_attendees: number;
    location: string;
    organizer: string;
    date: Date | null;
    time?: Timestamp | null;
};