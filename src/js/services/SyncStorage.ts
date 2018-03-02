import { IStorage } from '../interfaces/IStorage';

export default class SyncStorageController implements IStorage {
  public static getInstance(): SyncStorageController {
    return SyncStorageController.instance;
  }

  private static instance: SyncStorageController = new SyncStorageController();

  constructor() {
    if (SyncStorageController.instance) {
      throw new Error("Error: Instantiation failed: Use SyncStorageController.getInstance() instead of new.");
    }
    SyncStorageController.instance = this;
  }

  public get(key: string|[string]|object): Promise<object> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (res: any) => {
        resolve(res);
      });
    });
  }

  public set(key: object): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, () => {
        resolve();
      });
    });
  }

  public remove(key: string|[string]): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.remove(key, () => {
        resolve();
      });
    });
  }
}
