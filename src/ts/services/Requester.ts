import Axios, {AxiosInstance} from 'axios';
import {RequesterConfig} from "../typings/RequesterConfig";

export class Requester {
  private instance: AxiosInstance;

  constructor(config: RequesterConfig) {
    this.instance = Axios.create({
      baseURL: config.apiUrl,
      headers: {'X-Redmine-API-Key': config.apiKey},
      timeout: 10000,
    });
  }

  public makeRequest(config: object) {
    this.instance.request(config);
  }
}
