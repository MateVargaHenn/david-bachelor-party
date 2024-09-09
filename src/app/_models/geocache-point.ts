import { GeoPoint } from "firebase/firestore";

export interface GeocachePoint {
    id?: string;
    AnswerStatus: number;
    Coordinates: GeoPoint;
    CorrectAnswer: string;
    Description: string;
    Help: string;
    Title: string;
    Icon: any;
}
