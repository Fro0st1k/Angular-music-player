import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IQuery } from '../../entities/interfaces/IQuery.interface';
@Injectable({
  providedIn: 'root'
})

export class DataBaseService {
  constructor(private afs: AngularFirestore) {}

  getCollection(query: IQuery): AngularFirestoreCollection {
    return this.afs.collection(query.path);
  }

  getDocument(query: IQuery): AngularFirestoreDocument {
    return this.afs.collection(query.path).doc(query.doc);
  }

  updateDataInDocument(query: IQuery): void {
    this.afs.collection(query.path).doc(query.doc).update(query.payload);
  }

  createDocument(query: IQuery): void {
    this.afs.collection(query.path).add(query.payload);
  }

  createNewCollection(query: IQuery): void {
    this.afs.collection(query.path).doc(query.doc).set(query.payload);
  }

  rewriteDocumentData(query: IQuery): void {
    this.createNewCollection(query);
  }

  getCollectionWithSorting(query: IQuery): AngularFirestoreCollection {
    return this.afs.collection(query.path, ref => {
      return ref.orderBy(query.sort.field, query.sort.direction);
    });
  }

  getCollectionWithRules(query: IQuery): AngularFirestoreCollection {
    return this.afs.collection(query.path, ref => {
      return ref.where(query.compare.field, query.compare.operator, query.compare.value).limit(query.limit);
    });
  }

  getCollectionWithLimit(query: IQuery): AngularFirestoreCollection {
    return this.afs.collection(query.path, ref => {
      return ref.limit(query.limit);
    });
  }

  getCollectionAfter(query: IQuery, cursor: AngularFirestoreDocument): AngularFirestoreCollection {
    return this.afs.collection(query.path, ref => {
      return ref.limit(query.limit).startAfter(cursor);
    });
  }

  createDocumentId(): string {
    return this.afs.createId();
  }
}
