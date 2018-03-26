import {IValidator} from "../interfaces/IValidator";
import {ValidateData} from "../typings/ValidateData";

export class Validator implements IValidator {
  public options: object;

  constructor(options: object) {
    this.options = options;
  }

  public validate(data: ValidateData, messages: object) {
    const val = data.value;
    const isValid = true;
    const errors = [];
    if (data.required && !val.trim().length) {
      errors.push('required');
    }

    return {errors, isValid};
  }
}
