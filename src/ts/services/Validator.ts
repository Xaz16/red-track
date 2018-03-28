import {ValidateData} from "../typings/ValidateData";
import {ValidationMessages} from "../typings/ValidationMessages";

export class Validator {
  public static validate(data: ValidateData) {
    const val = data.value.trim();
    const messages = [];
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
    for (const key of errors) {
      const message = (validationMessages as any)[key].replace(`{${key}}`, (data.rules as any)[key]);
      messages.push(message);
    }

    return {errors, isValid: !errors.length, messages};
  }
}

const validationMessages: ValidationMessages = {
  maxLength: 'This field should be less than {maxLength} charters',
  minLength: 'This field should be more than {minLength} charters',
  pattern: 'This field isn\'t correct',
  required: 'This field is required',
};
