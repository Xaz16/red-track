import {Credentials} from "../typings/Credentials";

export interface IAuthGuard {
  checkCredentials: (data: Credentials) => Promise<void>;
  validateInput: ($input: HTMLElement, threshold: number) => void;
  checkPermissions: () => void;
}
