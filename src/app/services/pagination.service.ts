import { DataBaseService } from './data-base.service';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PaginationService {
  private query: QueryConfig;
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  data: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();

  constructor(private dbService: DataBaseService) {}

  initConfig(path: string, field?: string, opts?: any): void {
    this.query = {
      path,
      field,
      limit: 5,
      reverse: false,
      prepend: false,
      ...opts
    };

    const firstCollection = this.dbService.getCollectionWithLimit(this.query.path, this.query.limit);
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

    const nextCollection = this.dbService.getCollectionAfter(this.query.path, this.query.limit, cursor);
    this.mapAndUpdate(nextCollection);
  }

  private mapAndUpdate(col: AngularFirestoreCollection<any>) {

    if (this._done.value || this._loading.value) {
      return;
    }

    this._loading.next(true);
    console.log('loadingNext');
    return col.snapshotChanges().pipe(
      tap(arr => {
        const values = arr.map(snap => {
          const data = snap.payload.doc.data();
          const doc = snap.payload.doc;
          return { ...data, doc };
        });
        this._data.next(values);
        console.log('loadingNextFinish');
        this._loading.next(false);

        if (!values.length) {
          this._done.next(true);
        }
      }),
      take(1)
    ).subscribe();
  }
}

interface QueryConfig {
  path: string;
  field: string;
  limit: number;
  reverse: boolean;
  prepend: boolean;
}
