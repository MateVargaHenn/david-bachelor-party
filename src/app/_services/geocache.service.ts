import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, updateDoc, CollectionReference,collectionData, docData  } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { GeocachePoint } from '../_models/geocache-point';

@Injectable({
  providedIn: 'root'
})
export class GeocacheService {
  private collectionPath = 'GeocachePoints';

  constructor(private firestore: Firestore) {}

  getGeocachePoint(id: string): Observable<GeocachePoint | undefined> {
    const docRef = doc(this.firestore, `${this.collectionPath}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<GeocachePoint | undefined>;
  }

  getAllGeocachePoints(): Observable<GeocachePoint[]> {
    const colRef = collection(this.firestore, this.collectionPath) as CollectionReference<GeocachePoint>;
    return collectionData(colRef, { idField: 'id' }) as Observable<GeocachePoint[]>;
  }

  updateHasAnswered(id: string, newValue: number): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionPath}/${id}`);
    return updateDoc(docRef, { AnswerStatus: newValue });
  }

  checkAnswerAndUpdate(id: string, userAnswer: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionPath}/${id}`);
    return getDoc(docRef).then(docSnap => {
      if (docSnap.exists()) {
        const data = docSnap.data() as GeocachePoint;
        if (data.CorrectAnswer === userAnswer) {
          this.updateHasAnswered(id, 0);
        } else {
          throw new Error('Incorrect answer');
        }
      } else {
        throw new Error('Document does not exist');
      }
    });
  }
}
