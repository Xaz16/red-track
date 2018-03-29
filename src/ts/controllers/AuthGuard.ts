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
    this.syncStorage = SyncStorageController.getInstance();
    this.Validator = new Validator();
    this.Navigation = navigation;

    document.querySelector('[data-listen-form').addEventListener('broadcast', () => {
      this.checkPermissions();
    });
    setInterval(this.checkPermissions, 60000);
  }

  public async checkCredentials(data: Credentials): Promise<void> {
    const credentials = {
      apiKey: data.apiKey || '',
      apiUrl: data.apiUrl || 'google.com',
    };
    const RequesterInst = new Requester(credentials);
    try {
      const res = await RequesterInst.makeRequest({
        method: 'GET',
        url: credentials.apiUrl + '/users/current.json',
      });

      if (res.status === 200) {
        this.isCredentialsValid = true;
        this.setCredentials(credentials);
      }
    } catch (e) {
      throw new Error(e);
    }

  }

  public validateInput($input: any, threshold: number): void {
    $input.addEventListener('change', () => {
      const data: ValidateData = {
        name: $input.name,
        rules: {
          pattern: new RegExp('^(https?:\\/\\/)?([\\w\\.]+)\\.([a-z]{2,6}\\.?)(\\/[\\w\\.]*)*\\/?$', 'gi'),
          required: true,
        },
        value: $input.value,
      };
      const validatorRes = Validator.validate(data);
      if (data.value.length >= threshold && !validatorRes.isValid) {
        const $error: HTMLElement = $input.parentElement.querySelector('.err-messages');
        let messages = '';
        validatorRes.messages.map((item) => {
          messages += `<span>${item}</span><br>`;
        });
        $error.innerHTML = messages;
      }
      if (validatorRes.isValid) {
        const event = new Event('broadcast');
        $input.parents('[data-listen-form]')[0].dispatchEvent(event);
      }
    });
  }

  public async checkPermissions() {
    const cred = new Credentials(await this.credentials);
    await this.checkCredentials(cred);

    this.isCredentialsValid ? this.allowAccess() : this.restrictAccess();
  }

  private setCredentials(data: object): void {
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
    this.Navigation.goToPage('tasks');
  }
}
