const formState = {
   mobileNum: '',
};

//TODO : track stage state to prevent duplicate rendering

$(document).ready(() => {
   const signInForm = $('#sign-in-form');

   renderStageOne(signInForm);
   // firstNameField.on('change', function (e) {

   // });
   $(':input').inputmask('');

   // $('h1').hide();
   // $('button').click((event) => {
   //    console.log('click event');
   //    console.log(event);
   // });
   // $('button').on('click', () => {
   //    console.log('click event');
   // });
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
      isStageFinish() && renderStageTwo(signInForm);
   }
   function isStageFinish() {
      return formState.firstName && formState.lastName;
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
      isStageFinish() && renderStageThree(signInForm);
   }
   function isStageFinish() {
      return formState.mobilePre === 'IL' && isValidMobileNum(formState.mobileNum);
   }
}

/** Stage Three : Render : Button -> validate mobile number */
function renderStageThree(signInForm) {
   /** Create, Render UI */
   const validateCodeButton = generateLoadingButton('btn-test', 'אמת מספר', onClickHandler);
   signInForm.append(validateCodeButton);
   /** Functions */
   function onClickHandler() {
      renderStageFour(signInForm, validateCodeButton);
      validateCodeButton.off();
   }
}

/** Stage Four : Render : Validation Code Input, Button -> validate mobile number */
function renderStageFour(signInForm, validateCodeButton) {
   /** Create, Render UI */
   const validationCodeField = generateTextInput(
      'validation-code',
      'validationCode',
      'number',
      'הכנס קוד אימות',
      onChangeHandler,
   );
   addSideIconToTextInput(validationCodeField, './assets/icon-checked-gray.svg');
   validationCodeField.insertBefore(validateCodeButton);
   // signInForm.append([validationCodeField]);

   /** Functions */
   function onChangeHandler() {
      console.log('ffsdfsd');
   }
}
