import {ValidateData} from "../typings/ValidateData";

export interface IValidator {
  options: object;
  validate: (data: ValidateData, messages: object) => object;
}
