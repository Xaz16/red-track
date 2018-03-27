import { expect } from 'chai';
import 'mocha';
import {ValidateData} from "../typings/ValidateData";
import {Validator} from "./Validator";

const data: ValidateData = {
  name: 'test',
  rules: {
    maxLength: 20,
    minLength: 10,
    pattern: new RegExp('[a-z]', 'gi'),
    required: true,
  },
  value: '0',
};

describe('Test for Validator Service', () => {
  it('validate check pattern and minLength', () => {
    const validated = Validator.validate(data, {});
    expect(validated.errors).to.be.a('array');
    expect(validated.isValid).to.be.false;
    expect(validated.errors).to.deep.equal(['minLength', 'pattern']);
  });

  it('validate check maxLength', () => {
    data.value = 'daawjiodawdhaiwdhiawdiuahidiuawhdawdhawidhawd';
    const validated = Validator.validate(data, {});
    expect(validated.errors).to.be.a('array');
    expect(validated.isValid).to.be.false;
    expect(validated.errors).to.deep.equal(['maxLength']);
  });

  it('validate check required', () => {
    data.value = '';
    const validated = Validator.validate(data, {});
    expect(validated.errors).to.be.a('array');
    expect(validated.isValid).to.be.false;
    expect(validated.errors).to.deep.equal(['minLength', 'pattern', 'required']);
  });
});
