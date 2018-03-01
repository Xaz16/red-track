export interface IStorage {
  get: (key: string) => Promise;
  set: (key: string) => Promise;
  remove: (key: string) => Promise;
}