const formState = {
   firstName: '',
   lastName: '',
};

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
   $('#mobile-prefix').on('change', function (e) {
      console.log($(this).val());
   });

   $('select').each(function () {
      /** Hide original select element, create styled div that act as select, wrap both in select wrapper */
      const originalSelect = $(this);
      originalSelect.hide();
      originalSelect.wrap('<div class="select-wrapper"></div>');
      originalSelect.after('<div class="styled-select"></div>');

      /** Set text in styled select of selected option (default : first option)  */
      const styledSelect = originalSelect.next('div.styled-select');
      $('<span>', { text: originalSelect.find(':selected').text() }).appendTo(styledSelect);
      $('<img>', { src: './assets/icon-point-down-arrow.svg' }).appendTo(styledSelect);

      /** Create list element inside select wrapper to contain styled options */
      const styledOptions = $('<ul />', {
         class: 'styled-options',
      }).insertAfter(styledSelect);

      originalSelect.children('option').each(function () {
         const currentOption = $(this);
         $('<li />', {
            text: currentOption.text(),
            value: currentOption.val(),
         }).appendTo(styledOptions);
      });

      /** Event Handler */
      styledSelect.click(function (e) {
         e.stopPropagation();
         styledSelect.toggleClass('active');
         styledOptions.toggle();
      });

      styledOptions.children().click(function (e) {
         e.stopPropagation();
         const styledOptionItem = $(this);
         styledSelect.children('span').text(styledOptionItem.text());
         styledSelect.removeClass('active');
         styledOptions.hide();
         originalSelect.find(':selected').removeAttr('selected');
         originalSelect
            .find(`[value="${styledOptionItem.attr('value')}"]`)
            .attr('selected', 'true')
            .trigger('change');
      });

      $(document).click(function () {
         styledSelect.removeClass('active');
         styledOptions.hide();
      });
   });
});

/** Stage One : Render : First Name Field, Last Name Field */
function renderStageOne(signInForm) {
   const firstNameField = generateFirstNameField((value) => {
      formState.firstName = value;
      isStageOneFinish() && renderStageTwo(signInForm);
   });
   const lastNameField = generateLastNameField((value) => {
      formState.lastName = value;
      isStageOneFinish() && renderStageTwo(signInForm);
   });

   signInForm.append([firstNameField, lastNameField]);

   function isStageOneFinish() {
      return formState.firstName && formState.lastName;
   }
}

/** Stage One : Render : Mobile Number Field, Mobile Prefix Field */
function renderStageTwo(signInForm) {
   console.log('render stage 2 ');

   const mobileNumField = generateMobileNumField((value) => {
      formState.mobileNum = value;
      console.log(formState);
   });

   signInForm.append([mobileNumField]);
}
