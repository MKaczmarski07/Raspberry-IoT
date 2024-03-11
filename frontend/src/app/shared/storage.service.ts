import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public setValue(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public async getValue(key: string) {
    return await this._storage?.get(key);
  }
}
