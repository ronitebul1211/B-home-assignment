function generateFirstNameField(onChangeHandler) {
   const wrapper = $('<div>', { id: 'first-name', class: 'input-with-icon-wrapper' });
   const icon = $('<img>', { src: './assets/icon-user-gray.svg', alt: 'icon-user-gray' });
   const input = $('<input>', { type: 'text', placeholder: 'שם פרטי' });
   input.change((e) => {
      onChangeHandler(e.target.value);
   });
   return wrapper.append([icon, input]);
}

function generateLastNameField(onChangeHandler) {
   const input = $('<input>', { id: 'last-name', type: 'text', placeholder: 'שם משפחה' });
   input.change((e) => {
      onChangeHandler(e.target.value);
   });
   return input;
}

function generateMobileNumField(onChangeHandler) {
   const wrapper = $('<div>', { id: 'mobile-number', class: 'input-with-icon-wrapper' });
   const icon = $('<img>', { src: './assets/icon-phone-gray.svg', alt: 'icon-phone-gray' });
   const input = $('<input>', { type: 'number', placeholder: 'מספר נייד' });
   input.change((e) => {
      onChangeHandler(e.target.value);
   });
   return wrapper.append([icon, input]);
}

function generateMobilePrefixField(options, defaultValue, onChangeHandler) {
   // Render original select
   const originalSelect = renderSelectInput();

   /** Hide original select element, create styled div that act as select, wrap both in select wrapper */

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

   originalSelect.change(function (e) {
      onChangeHandler($(this).val());
   });

   function renderSelectInput() {
      const selectInput = $('<select>', { id: 'mobile-prefix', name: 'mobile-prefix' });
      options.forEach((optionData) => {
         const option = $('<option>', { value: optionData.value, text: optionData.text });
         optionData.value === defaultValue && option.attr('selected', 'true');
         selectInput.append(option);
      });
      return selectInput;
   }

   const wrapperRef = originalSelect.parent();
   return wrapperRef;
}
