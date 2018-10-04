import { DataBaseService } from './data-base.service';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan, tap, take } from 'rxjs/operators';
import { IQuery } from '../entities/interfaces/IQuery.interface';

@Injectable({
  providedIn: 'root'
})

export class PaginationService {
  private query: IQuery;
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  data: Observable<any>;
  loading: Observable<boolean> = this._loading.asObservable();

  constructor(
    private dbService: DataBaseService
  ) {}

  initConfig(path: string, opts?: any): void {
    this.query = {
      path,
      limit: 2,
      ...opts
    };

    const firstCollection = this.dbService.getCollectionWithLimit(this.query);
    this.mapAndUpdate(firstCollection);

    this.data = this._data.asObservable().pipe(
      scan((acc, value) => {
        return acc.concat(value);
      })
    );
  }

  private getCursor(): AngularFirestoreDocument | null {
    const current = this._data.value;

    if (current.length && current.length === this.query.limit) {
      return current[current.length - 1].doc;
    }

    return null;
  }

  public getNextData(): void {
    const cursor = this.getCursor();

    if (cursor === null || this._loading.value) {
      return;
    }

    const nextCollection = this.dbService.getCollectionAfter(this.query, cursor);
    this.mapAndUpdate(nextCollection);
  }

  private mapAndUpdate(collection: AngularFirestoreCollection<any>) {
    this._loading.next(true);
    return collection.snapshotChanges().pipe(
      tap(arr => {
        const values = arr.map(snap => {
          const data = snap.payload.doc.data();
          const doc = snap.payload.doc;
          return { ...data, doc };
        });
        this._data.next(values);
        this._loading.next(false);
      }),
      take(1)
    ).subscribe();
  }
}
