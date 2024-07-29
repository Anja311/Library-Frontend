import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  init(): Promise<void> {
    return new Promise<void>((resolve) => {
      console.log('LocalStorageService initialized');
      resolve();
    });
  }

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
