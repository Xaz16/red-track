import {IValidator} from "../interfaces/IValidator";
import {ValidateData} from "../typings/ValidateData";

export class Validator implements IValidator {
  public static validate(data: ValidateData, messages: object) {
    const val = data.value.trim();
    const errors: string[] = [];
    for (const key in data.rules) {
      if (data.rules.hasOwnProperty(key)) {
        if (key === 'required' && !val.length) {
          errors.push(key);
        }
        if (key === 'pattern' && !data.rules.pattern.test(val)) {
          errors.push(key);
        }
        if (key === 'minLength' && val.length < data.rules.minLength) {
          errors.push(key);
        }
        if (key === 'maxLength' && val.length > data.rules.maxLength) {
          errors.push(key);
        }
      }
    }
    return {errors, isValid: !errors.length};
  }
  public options: object;

  constructor(options: object) {
    this.options = options;
  }
}
