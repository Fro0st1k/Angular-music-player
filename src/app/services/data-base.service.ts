import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class DataBaseService {

  constructor(private afs: AngularFirestore) { }

  getCollection(collectionName: string): AngularFirestoreCollection {
    return this.afs.collection(collectionName);
  }

  getDocument(collectionName: string, documentName: string): AngularFirestoreDocument {
    return this.afs.collection(collectionName).doc(documentName);
  }

  addNewDataToDocument(collectionName: string, documentName: string, data: any): void {
    this.afs.collection(collectionName).doc(documentName).set(data);
  }

  updateDataInDocument(collectionName: string, documentName: string, data: any): void {
    this.addNewDataToDocument(collectionName, documentName, data);
  }

  createNewCollection(collectionName: string, documentName: string, data: any): void {
    this.afs.collection(collectionName).doc(documentName).set(data);
  }

  rewriteDocumentData(collectionName: string, documentName: string, data: any): void {
    this.createNewCollection(collectionName, documentName, data);
  }

  getCollectionWithSorting(collectionRef: string, params: Iparams): AngularFirestoreCollection {
    return this.afs.collection(collectionRef, ref => {
      return ref.orderBy(params.field, params.direction);
    });
  }

  getCollectionWithRules(collectionName: string, options: Ioptions): AngularFirestoreCollection {
    return this.afs.collection(collectionName, ref => {
      return ref.where(options.field, options.operator, options.value).limit(options.limit);
    });
  }

  getCollectionWithLimit(collectionName: string, limitValue: number): AngularFirestoreCollection {
    return this.afs.collection(collectionName, ref => {
      return ref.limit(limitValue);
    });
  }

  getCollectionAfter(collectionName: string, limitValue: number, cursor) {
    return this.afs.collection(collectionName, ref => {
      return ref.limit(limitValue).startAfter(cursor);
    });
  }

  createDocumentId(): string {
    return this.afs.createId();
  }
}

interface Ioptions {
  value: number | string;
  operator: any; // ts error, it should be a string
  field: string;
  limit: number;
}

interface Iparams {
  field: string;
  direction: any; // ts error, it should be a string
}
