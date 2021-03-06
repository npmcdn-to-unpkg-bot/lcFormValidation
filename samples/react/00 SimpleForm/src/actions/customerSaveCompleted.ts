import {Promise} from 'es6-promise';
import {actionsDef} from './actionsDef';
import {FormValidationResult} from 'lc-form-validation';

interface ICustomerSaveCompletedAction {
    type: string;
    formValidationResult: FormValidationResult;
}

let customerSaveCompleted = (formValidationResult: FormValidationResult) : ICustomerSaveCompletedAction => {
  return {
    type: actionsDef.customer.CUSTOMER_SAVE_COMPLETED,
    formValidationResult
  }
}

export {
    ICustomerSaveCompletedAction,
    customerSaveCompleted
}
