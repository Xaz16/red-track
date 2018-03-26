import {Credentials} from "../typings/Credentials";

export interface IAuthGuard {
  checkCredentials: (data: Credentials) => boolean;
  validateInput: ($input: HTMLElement) => void;
  checkPermissions: () => void;
}
