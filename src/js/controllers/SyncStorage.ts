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

  public get(key: string|[string]|object): Promise {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (res) => {
        resolve(res);
      });
    });
  }

  public set(key: object): Promise {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, () => {
        resolve();
      });
    });
  }

  public remove(key: string|[string]): Promise {
    return new Promise((resolve) => {
      chrome.storage.sync.remove(key, () => {
        resolve();
      });
    });
  }
}
