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
   const firstNameField = generateFirstNameField('firstName', onChangeHandler);
   const lastNameField = generateLastNameField('lastName', onChangeHandler);
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
   const mobileNumField = generateMobileNumField('mobileNum', onChangeHandler);

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
   const selectMobilePrefixField = generateMobilePrefixField(
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
         isValidMobileNum(value)
            ? renderValidator(mobileNumField, 'success')
            : renderValidator(mobileNumField, 'invalid');
      }
      isStageFinish() && renderStageThree(signInForm);
   }
   function isStageFinish() {
      return formState.mobilePre === 'IL' && isValidMobileNum(formState.mobileNum);
   }
}

function renderStageThree(signInForm) {
   console.log('render 3 ....');
}
