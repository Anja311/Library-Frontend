export class CollectionResponse<T> {
  collection: T[];

  constructor(collection: T[]) {
    this.collection = collection;
  }
}