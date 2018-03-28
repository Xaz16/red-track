import {IAuthGuard} from "../interfaces/IAuthGuard";
import {Requester} from "../services/Requester";
import SyncStorageController from "../services/SyncStorage";
import {Validator} from "../services/Validator";
import {Credentials} from "../typings/Credentials";
import {ValidateData} from "../typings/ValidateData";
import {NavigationController} from "./Navigation";

export class AuthGuard implements IAuthGuard {
  private syncStorage: SyncStorageController;
  private Validator: Validator;
  private Navigation: NavigationController;
  private isCredentialsValid: boolean;

  constructor(navigation: NavigationController) {
    this.syncStorage = new SyncStorageController();
    this.Validator = new Validator();
    this.Navigation = navigation;
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

  public validateInput($input: HTMLInputElement, threshold: number): void {
    $input.addEventListener('change', () => {
      const data: ValidateData = {
        name: 'test',
        rules: {
          maxLength: 20,
          minLength: 10,
          pattern: new RegExp('[a-z]', 'gi'),
          required: true,
        },
        value: $input.value,
      };
      Validator.validate(data);
    });
  }

  public async checkPermissions() {
    const cred = new Credentials(await this.credentials);
    await this.checkCredentials(cred);

    this.isCredentialsValid ? this.allowAccess() : this.restrictAccess();
  }

  private setCredentials(data: Credentials): void {
    this.syncStorage.set({credentials: data});
  }

  private get credentials(): Promise<Credentials> {
    return this.syncStorage.get('credentials');
  }

  private restrictAccess() {
    this.Navigation.goToPage('auth');
    this.Navigation.blockNavigation();
  }

  private allowAccess() {
    this.Navigation.bindToElement();
    this.Navigation.allowNavigation();
  }
}
