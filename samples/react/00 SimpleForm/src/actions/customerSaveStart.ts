import {Promise} from 'es6-promise';
import {actionsDef} from './actionsDef';
// IMPORTANT !! npm install will install the lcFormValidatin from local but not the d.ts
import {FormValidationResult} from 'lc-form-validation';
import {customerSaveCompleted} from './customerSaveCompleted';
import {customerFormValidation} from '../components/sampleForm/validations/customerFormValidation';

export function customerSaveStart(viewModel : any) {

    return (dispatcher) => {

        customerFormValidation.validateForm(viewModel).then(
          function(formValidationResult: FormValidationResult) {
             if(formValidationResult.succeeded) {
                // Call here the async call to save
                // additional logic or actins to be added on a real case
                console.log("Save Completed");
             }
             dispatcher(customerSaveCompleted(formValidationResult));
          }
        );
    }
}
