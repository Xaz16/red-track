export interface IStorage {
  get: (key: string|[string]|object) => Promise<object>;
  set: (key: object) => Promise<void> ;
  remove: (key: string) => Promise<void>;
}
