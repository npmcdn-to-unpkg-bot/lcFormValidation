import { expect } from 'chai';
import { ValidationEngine } from '../validationEngine';
import { FieldValidationResult, FormValidationResult } from '../entities';
import {consts} from '../consts';

//TODO: Implement Issue #20
describe('ValidationEngine Validate Form', () => {
    describe('Group #1 => When calling validateFullForm and addFieldValidationAsync', () => {
        it('Spec #1 => should return a failed FormValidationResult with one fieldErrors equals ' +
                '{ succeeded: false, key: "nameId", type: "REQUIRED", errorMessage: "Mandatory Field" }' +
            'When passing one validation rule with key equals "nameId" and viewModel equals { id: "1", fullname: "" }', (done) => {
            // Arrange
            const validationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: ''};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}]);

            validationEngine.addFieldValidationAsync('nameId',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                expect(formValidationResult.succeeded).to.be.false;

                expect(formValidationResult.fieldErrors).to.have.length(1);
                expect(formValidationResult.fieldErrors[0].succeeded).to.be.false;
                expect(formValidationResult.fieldErrors[0].key).to.be.equal('nameId');
                expect(formValidationResult.fieldErrors[0].type).to.equal('REQUIRED');
                expect(formValidationResult.fieldErrors[0].errorMessage).to.equal('Mandatory field');
                done();
              });
        });

        it('Spec #2 => should return a succeeded FormValidationResult with one fieldErrors equals { succeeded: true, key: "nameId", type: "REQUIRED", errorMessage: "" }' +
            'When passing one validation rule with key equals "nameId" and viewModel equals { id: "1", fullname: "john" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: 'john'};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}]);

            validationEngine.addFieldValidationAsync('nameId',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                expect(formValidationResult.succeeded).to.be.true;

                expect(formValidationResult.fieldErrors).to.have.length(1);
                expect(formValidationResult.fieldErrors[0].succeeded).to.be.true;
                expect(formValidationResult.fieldErrors[0].key).to.be.equal('nameId');
                expect(formValidationResult.fieldErrors[0].type).to.equal('REQUIRED');
                expect(formValidationResult.fieldErrors[0].errorMessage).to.equal('');
                done();
              });
        });

        it('Spec #3 => should return a failed FormValidationResult with two fieldErrors first equals ' +
                '{ succeeded: false, key: "nameId", type: "REQUIRED", errorMessage: "Mandatory field" }' +
                'and second equals { succeeded: false, key: "password", type: "REQUIRED", errorMessage: "Mandatory field" } ' +
            'When passing one validation rule with key equals "nameId", two validations rules with key equals "password" and viewModel equals ' +
                '{ id: "1", fullname: "", password: "" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: '', password: ''};

            // Act
            validationEngine.initialize([
                                            {formFieldName: 'nameId', vmFieldName: 'fullname'},
                                            {formFieldName: 'password', vmFieldName: 'password'},
            ]);

            // name mandatory
            validationEngine.addFieldValidationAsync('nameId',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            // password mandatory and min length 3
            validationEngine.addFieldValidationAsync('password',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.addFieldValidationAsync('password',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // minLenght
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let minLength : boolean = (value != null && value.length >= 3);

                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (minLength) ? "" : "Password must be at least 3 characters";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "MINLENGTH";
                                                      validationResult.succeeded = minLength;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                expect(formValidationResult.succeeded).to.be.false;

                expect(formValidationResult.fieldErrors).to.have.length(2);

                expect(formValidationResult.fieldErrors[0].succeeded).to.be.false;
                expect(formValidationResult.fieldErrors[0].key).to.be.equal('nameId');
                expect(formValidationResult.fieldErrors[0].type).to.equal('REQUIRED');
                expect(formValidationResult.fieldErrors[0].errorMessage).to.equal('Mandatory field');

                expect(formValidationResult.fieldErrors[1].succeeded).to.be.false;
                expect(formValidationResult.fieldErrors[1].key).to.be.equal('password');
                expect(formValidationResult.fieldErrors[1].type).to.equal('REQUIRED');
                expect(formValidationResult.fieldErrors[1].errorMessage).to.equal('Mandatory field');

                done();
              });
        });

        it('Spec #4 => should return a failed FormValidationResult with two fieldErrors ' +
                'first equals { succeeded: false, key: "nameId", type: "REQUIRED", errorMessage: "Mandatory field" }' +
                'and second equals { succeeded: false, key: "password", type: "MINLENGTH", errorMessage: "Password must be at least 3 characters" } ' +
            'When passing one validation rule with key equals "nameId", two validations rules with key equals "password" and viewModel equals ' +
                '{ id: "1", fullname: "", password: "1" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: '', password: '1'};

            // Act
            validationEngine.initialize([
                                            {formFieldName: 'nameId', vmFieldName: 'fullname'},
                                            {formFieldName: 'password', vmFieldName: 'password'},
            ]);

            // name mandatory
            validationEngine.addFieldValidationAsync('nameId',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            // password mandatory and min length 3
            validationEngine.addFieldValidationAsync('password',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.addFieldValidationAsync('password',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // minLenght
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let minLength : boolean = (value != null && value.length >= 3);

                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (minLength) ? "" : "Password must be at least 3 characters";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "MINLENGTH";
                                                      validationResult.succeeded = minLength;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                expect(formValidationResult.succeeded).to.be.false;

                expect(formValidationResult.fieldErrors).to.have.length(2);

                expect(formValidationResult.fieldErrors[0].succeeded).to.be.false;
                expect(formValidationResult.fieldErrors[0].key).to.be.equal('nameId');
                expect(formValidationResult.fieldErrors[0].type).to.equal('REQUIRED');
                expect(formValidationResult.fieldErrors[0].errorMessage).to.equal('Mandatory field');

                expect(formValidationResult.fieldErrors[1].succeeded).to.be.false;
                expect(formValidationResult.fieldErrors[1].key).to.be.equal('password');
                expect(formValidationResult.fieldErrors[1].type).to.equal('MINLENGTH');
                expect(formValidationResult.fieldErrors[1].errorMessage).to.equal('Password must be at least 3 characters');

                done();
              });
        });

        it('Spec #5 => should return a failed FormValidationResult with two fieldErrors ' +
                'first equals { succeeded: false, key: "nameId", type: "REQUIRED", errorMessage: "Mandatory field" }' +
                'and second equals { succeeded: true, key: "password", type: "MINLENGTH", errorMessage: "" } ' +
            'When passing one validation rule with key equals "nameId", two validations rules with key equals "password" and viewModel equals ' +
                '{ id: "1", fullname: "", password: "123" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: '', password: '123'};

            // Act
            validationEngine.initialize([
                                            {formFieldName: 'nameId', vmFieldName: 'fullname'},
                                            {formFieldName: 'password', vmFieldName: 'password'},
            ]);

            // name mandatory
            validationEngine.addFieldValidationAsync('nameId',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            // password mandatory and min length 3
            validationEngine.addFieldValidationAsync('password',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.addFieldValidationAsync('password',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // minLenght
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let minLength : boolean = (value != null && value.length >= 3);

                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (minLength) ? "" : "Password must be at least 3 characters";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "MINLENGTH";
                                                      validationResult.succeeded = minLength;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                expect(formValidationResult.succeeded).to.be.false;

                expect(formValidationResult.fieldErrors).to.have.length(2);

                expect(formValidationResult.fieldErrors[0].succeeded).to.be.false;
                expect(formValidationResult.fieldErrors[0].key).to.be.equal('nameId');
                expect(formValidationResult.fieldErrors[0].type).to.equal('REQUIRED');
                expect(formValidationResult.fieldErrors[0].errorMessage).to.equal('Mandatory field');

                expect(formValidationResult.fieldErrors[1].succeeded).to.be.true;
                expect(formValidationResult.fieldErrors[1].key).to.be.equal('password');
                expect(formValidationResult.fieldErrors[1].type).to.equal('MINLENGTH');
                expect(formValidationResult.fieldErrors[1].errorMessage).to.equal('');

                done();
              });
        });

        it('Spec #6 => should return a succeeded FormValidationResult with two fieldErrors first equals ' +
                '{ succeeded: true, key: "nameId", type: "REQUIRED", errorMessage: "" }' +
                'and second equals { succeeded: true, key: "password", type: "MINLENGTH", errorMessage: "" }' +
            'When passing one validation rule with key equals "nameId", two validations rules with key equals "password" and viewModel equals ' +
                '{ id: "1", fullname: "john", password: "123" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: 'john', password: '123'};

            // Act
            validationEngine.initialize([
                                            {formFieldName: 'nameId', vmFieldName: 'fullname'},
                                            {formFieldName: 'password', vmFieldName: 'password'},
            ]);

            // name mandatory
            validationEngine.addFieldValidationAsync('nameId',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            // password mandatory and min length 3
            validationEngine.addFieldValidationAsync('password',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.addFieldValidationAsync('password',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // minLenght
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let minLength : boolean = (value != null && value.length >= 3);

                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (minLength) ? "" : "Password must be at least 3 characters";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "MINLENGTH";
                                                      validationResult.succeeded = minLength;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                expect(formValidationResult.succeeded).to.be.true;

                expect(formValidationResult.fieldErrors).to.have.length(2);

                expect(formValidationResult.fieldErrors[0].succeeded).to.be.true;
                expect(formValidationResult.fieldErrors[0].key).to.be.equal('nameId');
                expect(formValidationResult.fieldErrors[0].type).to.equal('REQUIRED');
                expect(formValidationResult.fieldErrors[0].errorMessage).to.equal('');

                expect(formValidationResult.fieldErrors[1].succeeded).to.be.true;
                expect(formValidationResult.fieldErrors[1].key).to.be.equal('password');
                expect(formValidationResult.fieldErrors[1].type).to.equal('MINLENGTH');
                expect(formValidationResult.fieldErrors[1].errorMessage).to.equal('');

                done();
              });
        });

        it('Spec #7 => should return a rejected promise ' +
            'When passing one validation rule that contains an uncontrolled exception', (done) => {
            // Arrange
            const validationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: ''};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}]);

            validationEngine.addFieldValidationAsync('nameId',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      let error : boolean = true;
                                                      if(error) {
                                                        throw "Intentionally uncontrolled exception, single field validation testing fullform validations"
                                                      }
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            let promise = validationEngine.validateFullForm(viewModel);

            //Assert
            expect(promise).to.eventually.be.rejected.notify(done);
        });

    });

    describe('Group #2 => When calling validateFullForm and addFormValidationAsync', () => {
        it('Spec #1 => should return a succeeded FormValidationResult with one formGlobalErrors equals '+
                '{ succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
            'When passing one global validation rule and viewModel equals { id: "1", fullname: "john" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: 'john'};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}]);

            validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                      let isFieldInformed : boolean = (vm.fullname != null && vm.fullname.length > 0);
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Global form check Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "GLOBAL_FORM_REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                  expect(formValidationResult.succeeded).to.be.true;

                  expect(formValidationResult.formGlobalErrors).to.have.length(1);

                  expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
                  expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
                  expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
                  expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

                  done();
              });
        });

        it('Spec #2 => should return a failed FormValidationResult with one formGlobalErrors equals '+
                '{ succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "Global form check Mandatory field" }' +
            'When passing one global validation rule and viewModel equals { id: "1", fullname: "" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: ''};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}]);

            validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                      let isFieldInformed : boolean = (vm.fullname != null && vm.fullname.length > 0);
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Global form check Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "GLOBAL_FORM_REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                  expect(formValidationResult.succeeded).to.be.false;

                  expect(formValidationResult.formGlobalErrors).to.have.length(1);

                  expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.false;
                  expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
                  expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
                  expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('Global form check Mandatory field');

                  done();
              });
        });

        it('Spec #3 => should return a succeeded FormValidationResult with two formGlobalErrors '+
                'first equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
                'second equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_MIN_LENGTH", errorMessage: "" }' +
            'When passing two global validation rules and viewModel equals { id: "1", fullname: "john" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: 'john'};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}]);

            validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                      let isFieldInformed : boolean = (vm.fullname != null && vm.fullname.length > 0);
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Global form check Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "GLOBAL_FORM_REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // minLenght
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let minLength : boolean = (vm.fullname != null && vm.fullname.length >= 3);

                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (minLength) ? "" : "Global form check must be at least 3 characters";

                                                      const fieldValidationResult : FieldValidationResult = new FieldValidationResult();
                                                      fieldValidationResult.type = "GLOBAL_FORM_MIN_LENGTH";
                                                      fieldValidationResult.succeeded = minLength;
                                                      fieldValidationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(fieldValidationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                  expect(formValidationResult.succeeded).to.be.true;

                  expect(formValidationResult.formGlobalErrors).to.have.length(2);

                  expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
                  expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
                  expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
                  expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

                  expect(formValidationResult.formGlobalErrors[1].succeeded).to.be.true;
                  expect(formValidationResult.formGlobalErrors[1].key).to.be.equal('_GLOBAL_FORM_');
                  expect(formValidationResult.formGlobalErrors[1].type).to.equal('GLOBAL_FORM_MIN_LENGTH');
                  expect(formValidationResult.formGlobalErrors[1].errorMessage).to.equal('');

                  done();
              });
        });

        it('Spec #4 => should return a failed FormValidationResult with two formGlobalErrors '+
                'first equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
                'second equals { succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_MIN_LENGTH", errorMessage: "Global form check must be at least 3 characters" }' +
            'When passing two global validation rules and viewModel equals { id: "1", fullname: "jo" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: 'jo'};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}]);

            validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                      let isFieldInformed : boolean = (vm.fullname != null && vm.fullname.length > 0);
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Global form check Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "GLOBAL_FORM_REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // minLenght
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let minLength : boolean = (vm.fullname != null && vm.fullname.length >= 3);

                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (minLength) ? "" : "Global form check must be at least 3 characters";

                                                      const fieldValidationResult : FieldValidationResult = new FieldValidationResult();
                                                      fieldValidationResult.type = "GLOBAL_FORM_MIN_LENGTH";
                                                      fieldValidationResult.succeeded = minLength;
                                                      fieldValidationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(fieldValidationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                  expect(formValidationResult.succeeded).to.be.false;

                  expect(formValidationResult.formGlobalErrors).to.have.length(2);

                  expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
                  expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
                  expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
                  expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

                  expect(formValidationResult.formGlobalErrors[1].succeeded).to.be.false;
                  expect(formValidationResult.formGlobalErrors[1].key).to.be.equal('_GLOBAL_FORM_');
                  expect(formValidationResult.formGlobalErrors[1].type).to.equal('GLOBAL_FORM_MIN_LENGTH');
                  expect(formValidationResult.formGlobalErrors[1].errorMessage).to.equal('Global form check must be at least 3 characters');

                  done();
              });
        });

        it('Spec #4 => should return a failed FormValidationResult with two formGlobalErrors '+
                'first equals { succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "Global form check Mandatory field" }' +
                'second equals { succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_MIN_LENGTH", errorMessage: "Global form check must be at least 3 characters" }' +
            'When passing two global validation rules and viewModel equals { id: "1", fullname: "" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: ''};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}]);

            validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                      let isFieldInformed : boolean = (vm.fullname != null && vm.fullname.length > 0);
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Global form check Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "GLOBAL_FORM_REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // minLenght
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let minLength : boolean = (vm.fullname != null && vm.fullname.length >= 3);

                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (minLength) ? "" : "Global form check must be at least 3 characters";

                                                      const fieldValidationResult : FieldValidationResult = new FieldValidationResult();
                                                      fieldValidationResult.type = "GLOBAL_FORM_MIN_LENGTH";
                                                      fieldValidationResult.succeeded = minLength;
                                                      fieldValidationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(fieldValidationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                  expect(formValidationResult.succeeded).to.be.false;

                  expect(formValidationResult.formGlobalErrors).to.have.length(2);

                  expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.false;
                  expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
                  expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
                  expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('Global form check Mandatory field');

                  expect(formValidationResult.formGlobalErrors[1].succeeded).to.be.false;
                  expect(formValidationResult.formGlobalErrors[1].key).to.be.equal('_GLOBAL_FORM_');
                  expect(formValidationResult.formGlobalErrors[1].type).to.equal('GLOBAL_FORM_MIN_LENGTH');
                  expect(formValidationResult.formGlobalErrors[1].errorMessage).to.equal('Global form check must be at least 3 characters');

                  done();
              });
        });
    });

    describe('Group #3 => When calling validateFullForm, addFieldValidationAsync and addFormValidationAsync', () => {
        it('Spec #1 => should return a succeeded FormValidationResult with one fieldErrors and one formGlobalErrors'+
                'first equals { succeeded: true, key: "address", type: "REQUIRED", errorMessage: "" }' +
                'second equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
            'When passing one validation rule with key equals "address", global validation rule and viewModel ' +
                'equals { id: "1", fullname: "john", address: "mystreet" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: 'john', address: 'mystreet'};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}, {formFieldName: 'address', vmFieldName: 'address'}]);

            validationEngine.addFieldValidationAsync('address',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );


            validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                      let isFieldInformed : boolean = (vm.fullname != null && vm.fullname.length > 0);
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Global form check Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "GLOBAL_FORM_REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                  expect(formValidationResult.succeeded).to.be.true;

                  expect(formValidationResult.fieldErrors).to.have.length(1);
                  expect(formValidationResult.fieldErrors[0].succeeded).to.be.true;
                  expect(formValidationResult.fieldErrors[0].key).to.be.equal('address');
                  expect(formValidationResult.fieldErrors[0].type).to.equal('REQUIRED');
                  expect(formValidationResult.fieldErrors[0].errorMessage).to.equal('');

                  expect(formValidationResult.formGlobalErrors).to.have.length(1);
                  expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
                  expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
                  expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
                  expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

                  done();
              });
        });

        it('Spec #2 => should return a failed FormValidationResult with  one fieldErrors and one formGlobalErrors '+
                'first equals { succeeded: false, key: "address", type: "REQUIRED", errorMessage: "Mandatory field" }' +
                'second equals { succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "Global form check Mandatory field" }' +
            'When passing one validation rule with key equals "address", global validation rule and viewModel ' +
                'equals { id: "1", fullname: "", address: "" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: '', address: ''};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}, {formFieldName: 'address', vmFieldName: 'address'}]);

            validationEngine.addFieldValidationAsync('address',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );


            validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                      let isFieldInformed : boolean = (vm.fullname != null && vm.fullname.length > 0);
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Global form check Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "GLOBAL_FORM_REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                  expect(formValidationResult.succeeded).to.be.false;

                  expect(formValidationResult.fieldErrors).to.have.length(1);
                  expect(formValidationResult.fieldErrors[0].succeeded).to.be.false;
                  expect(formValidationResult.fieldErrors[0].key).to.be.equal('address');
                  expect(formValidationResult.fieldErrors[0].type).to.equal('REQUIRED');
                  expect(formValidationResult.fieldErrors[0].errorMessage).to.equal('Mandatory field');

                  expect(formValidationResult.formGlobalErrors).to.have.length(1);
                  expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.false;
                  expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
                  expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
                  expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('Global form check Mandatory field');

                  done();
              });
        });

        it('Spec #3 => should return a failed FormValidationResult with  one fieldErrors and one formGlobalErrors '+
                'first equals { succeeded: true, key: "address", type: "REQUIRED", errorMessage: "" }' +
                'second equals { succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "Global form check Mandatory field" }' +
            'When passing one validation rule with key equals "address", global validation rule and viewModel ' +
                'equals { id: "1", fullname: "", address: "street" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: '', address: 'street'};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}, {formFieldName: 'address', vmFieldName: 'address'}]);

            validationEngine.addFieldValidationAsync('address',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );


            validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                      let isFieldInformed : boolean = (vm.fullname != null && vm.fullname.length > 0);
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Global form check Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "GLOBAL_FORM_REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                  expect(formValidationResult.succeeded).to.be.false;

                  expect(formValidationResult.fieldErrors).to.have.length(1);
                  expect(formValidationResult.fieldErrors[0].succeeded).to.be.true;
                  expect(formValidationResult.fieldErrors[0].key).to.be.equal('address');
                  expect(formValidationResult.fieldErrors[0].type).to.equal('REQUIRED');
                  expect(formValidationResult.fieldErrors[0].errorMessage).to.equal('');

                  expect(formValidationResult.formGlobalErrors).to.have.length(1);
                  expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.false;
                  expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
                  expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
                  expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('Global form check Mandatory field');

                  done();
              });
        });

        it('Spec #4 => should return a failed FormValidationResult with  one fieldErrors and one formGlobalErrors '+
                'first equals { succeeded: false, key: "address", type: "REQUIRED", errorMessage: "Mandatory field" }' +
                'second equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
            'When passing one validation rule with key equals "address", global validation rule and viewModel ' +
                'equals { id: "1", fullname: "john", address: "" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: 'john', address: ''};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}, {formFieldName: 'address', vmFieldName: 'address'}]);

            validationEngine.addFieldValidationAsync('address',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      // We will isolate this into common functions
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );


            validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                      let isFieldInformed : boolean = (vm.fullname != null && vm.fullname.length > 0);
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Global form check Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "GLOBAL_FORM_REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                  expect(formValidationResult.succeeded).to.be.false;

                  expect(formValidationResult.fieldErrors).to.have.length(1);
                  expect(formValidationResult.fieldErrors[0].succeeded).to.be.false;
                  expect(formValidationResult.fieldErrors[0].key).to.be.equal('address');
                  expect(formValidationResult.fieldErrors[0].type).to.equal('REQUIRED');
                  expect(formValidationResult.fieldErrors[0].errorMessage).to.equal('Mandatory field');

                  expect(formValidationResult.formGlobalErrors).to.have.length(1);
                  expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
                  expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
                  expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
                  expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

                  done();
              });
        });


        it('Spec #5 => should return a promise rejected '+
            'When passing one faulty global validation rule'
            , (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: 'john', address: ''};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}, {formFieldName: 'address', vmFieldName: 'address'}]);

            validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                      let error : boolean = true;

                                                      if(error) {
                                                        throw "Intentionally global form uncontrolled exception"
                                                      }

                                                      let isFieldInformed : boolean = (vm.fullname != null && vm.fullname.length > 0);
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Global form check Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "GLOBAL_FORM_REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            const promise = validationEngine.validateFullForm(viewModel)
            expect(promise).to.eventually.be.rejected.notify(done);
        });
    });

    describe('Group #4 => When calling validateFullForm, addFieldValidation and addFieldValidationAsync', () => {
      it('Spec #1 => should return a failed FormValidationResult with one fieldErrors equals ' +
                '{ succeeded: false, key: "nameId", type: "REQUIRED", errorMessage: "Mandatory Field" }' +
            'When passing one sync validation rule with key equals "nameId" and viewModel equals { id: "1", fullname: "" }', (done) => {
            // Arrange
            const validationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: ''};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}]);

            validationEngine.addFieldValidation('nameId',
                                                  (vm, value) : FieldValidationResult => {
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return validationResult;
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                expect(formValidationResult.succeeded).to.be.false;

                expect(formValidationResult.fieldErrors).to.have.length(1);
                expect(formValidationResult.fieldErrors[0].succeeded).to.be.false;
                expect(formValidationResult.fieldErrors[0].key).to.be.equal('nameId');
                expect(formValidationResult.fieldErrors[0].type).to.equal('REQUIRED');
                expect(formValidationResult.fieldErrors[0].errorMessage).to.equal('Mandatory field');
                done();
              });
        });

        it('Spec #2 => should return a succeeded FormValidationResult with one fieldErrors equals { succeeded: true, key: "nameId", type: "REQUIRED", errorMessage: "" }' +
            'When passing one sync validation rule with key equals "nameId" and viewModel equals { id: "1", fullname: "john" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: 'john'};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}]);

            validationEngine.addFieldValidation('nameId',
                                                  (vm, value) : FieldValidationResult => {
                                                      // Required field
                                                      // in this case no async stuff
                                                      // we can directly resolve the promise
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      // We could use string ID's if multilanguage is required
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return validationResult;
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                expect(formValidationResult.succeeded).to.be.true;

                expect(formValidationResult.fieldErrors).to.have.length(1);
                expect(formValidationResult.fieldErrors[0].succeeded).to.be.true;
                expect(formValidationResult.fieldErrors[0].key).to.be.equal('nameId');
                expect(formValidationResult.fieldErrors[0].type).to.equal('REQUIRED');
                expect(formValidationResult.fieldErrors[0].errorMessage).to.equal('');
                done();
              });
        });

        it('Spec #3 => should return a failed FormValidationResult with two fieldErrors first equals ' +
                '{ succeeded: false, key: "nameId", type: "REQUIRED", errorMessage: "Mandatory Field" }' +
                'and second equals { succeeded: false, key: "password", type: "REQUIRED", errorMessage: "Mandatory Field" }' +
            'When passing one sync validation rule with key equals "nameId", one async validation rule with key equals "password" '+
              'and viewModel equals { id: "1", fullname: "", password: ""  }', (done) => {
            // Arrange
            const validationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: '', password: "" };

            // Act
            validationEngine.initialize([
                                          {formFieldName: 'nameId', vmFieldName: 'fullname'},
                                          {formFieldName: 'password', vmFieldName: 'password'},
            ]);

            validationEngine.addFieldValidation('nameId',
                                                  (vm, value) : FieldValidationResult => {
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return validationResult;
                                                  }
                                                );

            validationEngine.addFieldValidationAsync('password',
                                                (vm, value) : Promise<FieldValidationResult> => {
                                                    let isFieldInformed : boolean = (value != null && value.length > 0);
                                                    let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                    const validationResult : FieldValidationResult = new FieldValidationResult();
                                                    validationResult.type = "REQUIRED";
                                                    validationResult.succeeded = isFieldInformed;
                                                    validationResult.errorMessage = errorInfo;

                                                    return Promise.resolve(validationResult);
                                                }
                                              );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                expect(formValidationResult.succeeded).to.be.false;

                expect(formValidationResult.fieldErrors).to.have.length(2);

                expect(formValidationResult.fieldErrors[0].succeeded).to.be.false;
                expect(formValidationResult.fieldErrors[0].key).to.be.equal('nameId');
                expect(formValidationResult.fieldErrors[0].type).to.equal('REQUIRED');
                expect(formValidationResult.fieldErrors[0].errorMessage).to.equal('Mandatory field');

                expect(formValidationResult.fieldErrors[1].succeeded).to.be.false;
                expect(formValidationResult.fieldErrors[1].key).to.be.equal('password');
                expect(formValidationResult.fieldErrors[1].type).to.equal('REQUIRED');
                expect(formValidationResult.fieldErrors[1].errorMessage).to.equal('Mandatory field');

                done();
              });
        });

        it('Spec #4 => should return a succeeded FormValidationResult with two fieldErrors first equals ' +
                '{ succeeded: true, key: "nameId", type: "REQUIRED", errorMessage: "" }' +
                'and second equals { succeeded: true, key: "password", type: "REQUIRED", errorMessage: "" }' +
            'When passing one sync validation rule with key equals "nameId", one async validation rule with key equals "password" and viewModel equals ' +
                '{ id: "1", fullname: "john", password: "123" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: 'john', password: '123'};

            // Act
            validationEngine.initialize([
                                            {formFieldName: 'nameId', vmFieldName: 'fullname'},
                                            {formFieldName: 'password', vmFieldName: 'password'},
            ]);

            // name mandatory
            validationEngine.addFieldValidation('nameId',
                                                  (vm, value) : FieldValidationResult => {
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return validationResult;
                                                  }
                                                );

            // password mandatory and min length 3
            validationEngine.addFieldValidationAsync('password',
                                                  (vm, value) : Promise<FieldValidationResult> => {
                                                      let isFieldInformed : boolean = (value != null && value.length > 0);
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                expect(formValidationResult.succeeded).to.be.true;

                expect(formValidationResult.fieldErrors).to.have.length(2);

                expect(formValidationResult.fieldErrors[0].succeeded).to.be.true;
                expect(formValidationResult.fieldErrors[0].key).to.be.equal('nameId');
                expect(formValidationResult.fieldErrors[0].type).to.equal('REQUIRED');
                expect(formValidationResult.fieldErrors[0].errorMessage).to.equal('');

                expect(formValidationResult.fieldErrors[1].succeeded).to.be.true;
                expect(formValidationResult.fieldErrors[1].key).to.be.equal('password');
                expect(formValidationResult.fieldErrors[1].type).to.equal('REQUIRED');
                expect(formValidationResult.fieldErrors[1].errorMessage).to.equal('');

                done();
              });
        });
    });

    describe('Group #5 => When calling validateFullForm, addFormValidation and addFormValidationAsync', () => {
      it('Spec #1 => should return a succeeded FormValidationResult with one formGlobalErrors equals '+
            '{ succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
        'When passing one sync global validation rule and viewModel equals { id: "1", fullname: "john" }', (done) => {
        // Arrange
        const validationEngine : ValidationEngine = new ValidationEngine();
        const viewModel = {id: '1', fullname: 'john'};

        // Act
        validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}]);

        validationEngine.addFormValidation((vm) : FieldValidationResult => {
                                                  let isFieldInformed : boolean = (vm.fullname != null && vm.fullname.length > 0);
                                                  let errorInfo : string = (isFieldInformed) ? "" : "Global form check Mandatory field";

                                                  const validationResult : FieldValidationResult = new FieldValidationResult();
                                                  validationResult.type = "GLOBAL_FORM_REQUIRED";
                                                  validationResult.succeeded = isFieldInformed;
                                                  validationResult.errorMessage = errorInfo;

                                                  return validationResult;
                                              }
                                            );

        validationEngine.validateFullForm(viewModel)
          .then((formValidationResult : FormValidationResult) => {
              expect(formValidationResult.succeeded).to.be.true;

              expect(formValidationResult.formGlobalErrors).to.have.length(1);

              expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
              expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
              expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
              expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

              done();
          });
      });
    });

    it('Spec #2 => should return a failed FormValidationResult with one formGlobalErrors equals '+
          '{ succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "Global form check Mandatory field" }' +
      'When passing one global validation rule and viewModel equals { id: "1", fullname: "" }', (done) => {
      // Arrange
      const validationEngine : ValidationEngine = new ValidationEngine();
      const viewModel = {id: '1', fullname: ''};

      // Act
      validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}]);

      validationEngine.addFormValidation((vm) : FieldValidationResult => {
                                                let isFieldInformed : boolean = (vm.fullname != null && vm.fullname.length > 0);
                                                let errorInfo : string = (isFieldInformed) ? "" : "Global form check Mandatory field";

                                                const validationResult : FieldValidationResult = new FieldValidationResult();
                                                validationResult.type = "GLOBAL_FORM_REQUIRED";
                                                validationResult.succeeded = isFieldInformed;
                                                validationResult.errorMessage = errorInfo;

                                                return validationResult;
                                            }
                                          );

      validationEngine.validateFullForm(viewModel)
        .then((formValidationResult : FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.formGlobalErrors).to.have.length(1);

            expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.false;
            expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
            expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('Global form check Mandatory field');

            done();
        });
    });

    it('Spec #3 => should return a succeeded FormValidationResult with two formGlobalErrors '+
            'first equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
            'second equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_MIN_LENGTH", errorMessage: "" }' +
        'When passing one sync and other async global validation rules and viewModel equals { id: "1", fullname: "john" }', (done) => {
        // Arrange
        const validationEngine : ValidationEngine = new ValidationEngine();
        const viewModel = {id: '1', fullname: 'john'};

        // Act
        validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}]);

        validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                  let isFieldInformed : boolean = (vm.fullname != null && vm.fullname.length > 0);
                                                  let errorInfo : string = (isFieldInformed) ? "" : "Global form check Mandatory field";

                                                  const validationResult : FieldValidationResult = new FieldValidationResult();
                                                  validationResult.type = "GLOBAL_FORM_REQUIRED";
                                                  validationResult.succeeded = isFieldInformed;
                                                  validationResult.errorMessage = errorInfo;

                                                  return Promise.resolve(validationResult);
                                              }
                                            );

        validationEngine.addFormValidation((vm) : FieldValidationResult => {
                                                  let minLength : boolean = (vm.fullname != null && vm.fullname.length >= 3);
                                                  let errorInfo : string = (minLength) ? "" : "Global form check must be at least 3 characters";

                                                  const fieldValidationResult : FieldValidationResult = new FieldValidationResult();
                                                  fieldValidationResult.type = "GLOBAL_FORM_MIN_LENGTH";
                                                  fieldValidationResult.succeeded = minLength;
                                                  fieldValidationResult.errorMessage = errorInfo;

                                                  return fieldValidationResult;
                                              }
                                            );

        validationEngine.validateFullForm(viewModel)
          .then((formValidationResult : FormValidationResult) => {
              expect(formValidationResult.succeeded).to.be.true;

              expect(formValidationResult.formGlobalErrors).to.have.length(2);

              expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
              expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
              expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
              expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

              expect(formValidationResult.formGlobalErrors[1].succeeded).to.be.true;
              expect(formValidationResult.formGlobalErrors[1].key).to.be.equal('_GLOBAL_FORM_');
              expect(formValidationResult.formGlobalErrors[1].type).to.equal('GLOBAL_FORM_MIN_LENGTH');
              expect(formValidationResult.formGlobalErrors[1].errorMessage).to.equal('');

              done();
          });
    });

    it('Spec #4 => should return a failed FormValidationResult with two formGlobalErrors '+
                'first equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
                'second equals { succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_MIN_LENGTH", errorMessage: "Global form check must be at least 3 characters" }' +
            'When passing one sync and other async global validation rules and viewModel equals { id: "1", fullname: "jo" }', (done) => {
            // Arrange
            const validationEngine : ValidationEngine = new ValidationEngine();
            const viewModel = {id: '1', fullname: 'jo'};

            // Act
            validationEngine.initialize([{formFieldName: 'nameId', vmFieldName: 'fullname'}]);

            validationEngine.addFormValidationAsync((vm) : Promise<FieldValidationResult> => {
                                                      let isFieldInformed : boolean = (vm.fullname != null && vm.fullname.length > 0);
                                                      let errorInfo : string = (isFieldInformed) ? "" : "Global form check Mandatory field";

                                                      const validationResult : FieldValidationResult = new FieldValidationResult();
                                                      validationResult.type = "GLOBAL_FORM_REQUIRED";
                                                      validationResult.succeeded = isFieldInformed;
                                                      validationResult.errorMessage = errorInfo;

                                                      return Promise.resolve(validationResult);
                                                  }
                                                );

            validationEngine.addFormValidation((vm) : FieldValidationResult => {
                                                      let minLength : boolean = (vm.fullname != null && vm.fullname.length >= 3);
                                                      let errorInfo : string = (minLength) ? "" : "Global form check must be at least 3 characters";

                                                      const fieldValidationResult : FieldValidationResult = new FieldValidationResult();
                                                      fieldValidationResult.type = "GLOBAL_FORM_MIN_LENGTH";
                                                      fieldValidationResult.succeeded = minLength;
                                                      fieldValidationResult.errorMessage = errorInfo;

                                                      return fieldValidationResult;
                                                  }
                                                );

            validationEngine.validateFullForm(viewModel)
              .then((formValidationResult : FormValidationResult) => {
                  expect(formValidationResult.succeeded).to.be.false;

                  expect(formValidationResult.formGlobalErrors).to.have.length(2);

                  expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
                  expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
                  expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
                  expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

                  expect(formValidationResult.formGlobalErrors[1].succeeded).to.be.false;
                  expect(formValidationResult.formGlobalErrors[1].key).to.be.equal('_GLOBAL_FORM_');
                  expect(formValidationResult.formGlobalErrors[1].type).to.equal('GLOBAL_FORM_MIN_LENGTH');
                  expect(formValidationResult.formGlobalErrors[1].errorMessage).to.equal('Global form check must be at least 3 characters');

                  done();
              });
        });
});
