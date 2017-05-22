export class LocalStorageService {

  constructor(private storage: Storage) { }

  get(key): string {
    return this.storage.getItem(key);
  }

  set(key, data): void {
    this.storage.setItem(key, data);
  }

  remove(key) {
    this.storage.removeItem(key);
  }

  get length(): number {
    return this.storage.length;
  }

}

export function localStorageServiceFactory(): LocalStorageService {
  return new LocalStorageService(window.localStorage);
}
