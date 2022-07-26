import { Injectable } from '@angular/core';

type ILocalStorageKey = 'loginToken' | 'role';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: ILocalStorageKey, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get<T>(key: ILocalStorageKey): T | null {
    if (!this.storage) return null;

    const item = this.storage.getItem(key);
    if (!item) return null;

    return JSON.parse(item);
  }

  remove(key: ILocalStorageKey): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
