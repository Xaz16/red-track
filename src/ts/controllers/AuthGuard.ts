import {IAuthGuard} from "../interfaces/IAuthGuard";
import {Requester} from "../services/Requester";
import SyncStorageController from "../services/SyncStorage";
import {Validator} from "../services/Validator";
import {Credentials} from "../typings/Credentials";

export class AuthGuard implements IAuthGuard {
  private syncStorage: SyncStorageController;
  private Validator: Validator;
  private isCredentialsValid: boolean;

  constructor() {
    this.syncStorage = new SyncStorageController();
    this.Validator = new Validator();
    setInterval(this.checkPermissions, 60000);
  }

  public async checkCredentials(data: Credentials): Promise<void> {
    const RequesterInst = new Requester({
      apiKey: data.apiKey,
      apiUrl: data.apiUrl,
    });
    try {
      const res = await RequesterInst.makeRequest({
        method: 'GET',
        url: '/users/current.json',
      });

      if (res.status === 200) {
        this.isCredentialsValid = true;
      }
    } catch (e) {
      throw new Error(e);
    }

  }

  public validateInput($input: HTMLElement, threshold: number): void {
    const message = ';;';
  }

  public checkPermissions() {
    this.getCredentials.then((res: { apiUrl: string, apiKey: string }) => {
      const cred = new Credentials(res);
      this.checkCredentials(cred);
    });
  }

  private setCredentials(data: object): void {
    this.syncStorage.set({credentials: data});
  }

  private get getCredentials(): Promise<object> {
    return this.syncStorage.get('credentials');
  }

  private restrictAccess() {
    const restrict = false;
  }

  private allowAccess() {
    const restrict = false;
  }
}
