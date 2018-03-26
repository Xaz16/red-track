import {IAuthGuard} from "../interfaces/IAuthGuard";
import {Requester} from "../services/Requester";
import SyncStorageController from "../services/SyncStorage";
import {Validator} from "../services/Validator";
import {Credentials} from "../typings/Credentials";

export class AuthGuard implements IAuthGuard {
  public syncStorage: SyncStorageController;
  private Requester: Requester;
  private Validator: Validator;

  constructor(syncStorage: SyncStorageController, validator: Validator, requester: Requester) {
    this.syncStorage = syncStorage;
    this.Validator = validator;
    this.Requester = requester;
    setInterval(this.checkPermissions, 60000);
  }

  public checkCredentials(data: Credentials): boolean {
    let isValid = false;
    if (true) {
      isValid = true;
    }
    return isValid;
  }

  public validateInput($input: HTMLElement): void {
    const message = ';;';
  }

  public checkPermissions() {
    const credentials = this.getCredentials;
  }

  private setCredentials(data: object): void {
    this.syncStorage.set({credentials: data});
  }

  private get getCredentials(): object {
    return this.syncStorage.get('credentials');
  }
}
