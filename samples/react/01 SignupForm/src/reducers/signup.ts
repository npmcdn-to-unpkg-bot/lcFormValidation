import objectAssign = require('object-assign');
import { SignupEntity } from '../entity/signupEntity';
import { SignupErrors } from '../entity/signupErrors';
import { FormValidationResult, FieldValidationResult } from 'lc-form-validation';
import { actionsDef } from '../actions/actionsDef';
import { ISignupRequestCompletedAction } from '../actions/signupRequestCompleted';
import { ISignupUIOnInteractionCompletedAction } from '../actions/signupUIOnInteractionCompleted';

class SignupState {
  signup : SignupEntity;
  signupErrors : SignupErrors;

  public constructor() {
    this.signup = new SignupEntity();
    this.signupErrors = new SignupErrors();
  }
}

export let signupReducer = (state : SignupState = new SignupState(), action) : SignupState => {
  switch(action.type) {
    case actionsDef.signup.SIGNUP_PROCESS_UI_INTERACTION_COMPLETED:
      return signupProcessCompleted(state, action);

    case actionsDef.signup.SIGNUP_REQUEST_COMPLETED:
      return performSignupCompleted(state, action);

    default:
      return state;
  }
}

function signupProcessCompleted (state : SignupState, action : ISignupUIOnInteractionCompletedAction) : SignupState {
  let newSignup : SignupEntity = objectAssign({}, state.signup, {
    [action.fieldName]: action.value
  });

  let newSignupErrors : SignupErrors = objectAssign({}, state.signupErrors, {
    [action.fieldName]: action.fieldValidationResult
  });

  return objectAssign({}, state, {
    signup : newSignup,
    signupErrors: newSignupErrors
  });
}

function performSignupCompleted(state : SignupState, action : ISignupRequestCompletedAction) : SignupState {
  let newSignupErrors : SignupErrors = objectAssign({}, state.signupErrors);

  action.formValidationResult.fieldErrors.forEach(fieldValidationResult => {
    newSignupErrors[fieldValidationResult.key] = fieldValidationResult;
  });

  return objectAssign({}, state, {
    signupErrors: newSignupErrors
  });
}
