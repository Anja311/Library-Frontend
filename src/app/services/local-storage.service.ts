import { Injectable } from '@angular/core';
import { Book } from '../shared/models/Book';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addToLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string): any {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : null;
  }

  removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
