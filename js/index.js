const formState = {};
let formStage = 1;

$(document).ready(() => {
   const signInForm = $('#sign-in-form');
   renderStageOne(signInForm);
});

/** Stage One : Render : First Name Field, Last Name Field */
function renderStageOne(signInForm) {
   /** Create, Render UI */
   const firstNameField = generateTextInput('first-name', 'firstName', 'text', 'שם פרטי', onChangeHandler);
   addSideIconToTextInput(firstNameField, './assets/icon-user-gray.svg');
   const lastNameField = generateTextInput('last-name', 'lastName', 'text', 'שם משפחה', onChangeHandler);
   signInForm.append([firstNameField, lastNameField]);

   /** Functions */
   function onChangeHandler(name, value) {
      formState[name] = value;
      if (formStage === 1) {
         if (isStageFinish()) {
            renderStageTwo(signInForm);
            formStage = 2;
         }
      }
   }
   function isStageFinish() {
      return formState.firstName?.length > 2 && formState.lastName?.length > 2;
   }
}

/** Stage Two : Render : Mobile Number Field, Mobile Prefix Field */
function renderStageTwo(signInForm) {
   /** Create, Render UI */
   const mobileNumField = generateTextInput(
      'mobile-number',
      'mobileNum',
      'number',
      'מספר נייד',
      onChangeHandler,
   );
   addSideIconToTextInput(mobileNumField, './assets/icon-phone-gray.svg');
   addValidationIndicatorToTextInput(mobileNumField);
   const prefixOptions = [
      {
         value: 'IS',
         text: '354+',
      },
      {
         value: 'IL',
         text: '972+',
      },
      {
         value: 'JO',
         text: '667+',
      },
      {
         value: 'MO',
         text: '564+',
      },
   ];
   formState.mobilePre = 'IL'; // Default value
   const selectMobilePrefixField = generateCustomSelect(
      'mobile-prefix',
      'mobilePre',
      prefixOptions,
      formState.mobilePre,
      onChangeHandler,
   );
   signInForm.append([mobileNumField, selectMobilePrefixField]);

   /** Functions */
   function onChangeHandler(name, value) {
      formState[name] = value;
      if (name === 'mobileNum') {
         renderValidator(mobileNumField, isValidMobileNum(value) ? 'success' : 'invalid');
      }
      if (formStage === 2) {
         if (isStageFinish()) {
            renderStageThree(signInForm);
            formStage = 3;
         }
      }
   }
   function isStageFinish() {
      return formState.mobilePre === 'IL' && isValidMobileNum(formState.mobileNum);
   }
}

/** Stage Three : Render : Button -> validate mobile number */
function renderStageThree(signInForm) {
   /** Create, Render UI */
   const validateCodeButton = generateLoadingButton('btn-validation', 'אמת מספר', onClickHandler);
   signInForm.append(validateCodeButton);
   /** Functions */
   function onClickHandler() {
      validateCodeButton.off();
      renderStageFour(signInForm, validateCodeButton);
   }
}

/** Stage Four : Render : Validation Code Input, Button -> validate mobile number */
function renderStageFour(signInForm, validateCodeButton) {
   /** Create, Render UI */
   validateCodeButton.prop('disabled', true);
   const validationCodeField = generateTextInput(
      'validation-code',
      'validationCode',
      'number',
      'הכנס קוד אימות',
      onChangeHandler,
   );
   addSideIconToTextInput(validationCodeField, './assets/icon-checked-gray.svg');
   validationCodeField.insertBefore(validateCodeButton);

   /** Functions */
   $(validateCodeButton).on('click', async function () {
      renderLoader(validateCodeButton, true);
      validateCodeButton.prop('disabled', true);
      await dummyValidateCode();
      validateCodeButton.prop('disabled', false);
      renderLoader(validateCodeButton, false);
      renderStageFive(signInForm);
      validationCodeField.remove();
      validateCodeButton.remove();
   });
   function onChangeHandler(name, value) {
      name === 'validationCode' && value.length === 4 && validateCodeButton.prop('disabled', false);
   }
   function dummyValidateCode() {
      return new Promise((resolve) => setTimeout(resolve, 5000));
   }
}

/** Stage Five : Render :  */
function renderStageFive(signInForm) {
   /** Create, Render UI */
   formState.identity = 'self';
   const firstRadio = generateRadioButton(
      'first-radio',
      'self',
      true,
      'identity',
      'ממלא עבור עצמי',
      onChangeHandler,
   );
   const secondRadio = generateRadioButton(
      'second-radio',
      'child',
      false,
      'identity',
      'ממלא עבור קטין',
      onChangeHandler,
   );
   const radiosWrapper = $('<div>', { id: 'radio-group' });
   radiosWrapper.append([firstRadio, secondRadio]);
   const dateOfBirthField = generateTextInput(
      'date-of-birth',
      'dateOfBirth',
      'text',
      'הכנס תאריך לידה',
      onChangeHandler,
      "'alias': 'date'",
   );
   addSideIconToTextInput(dateOfBirthField, './assets/icon-birthday-cake-gray.svg');
   signInForm.append([radiosWrapper, dateOfBirthField]);

   /** Functions */
   function onChangeHandler(name, value) {
      formState[name] = value;
      console.log(formState);
   }
}
