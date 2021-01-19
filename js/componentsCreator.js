function generateFirstNameField(name, onChangeHandler) {
   const wrapper = $('<div>', { id: 'first-name', class: 'input-with-icon-wrapper' });
   const icon = $('<img>', { src: './assets/icon-user-gray.svg', alt: 'icon-user-gray' });
   const input = generateTextInput('text', 'שם פרטי', onChangeHandler, name);
   return wrapper.append([icon, input]);
}

function generateLastNameField(name, onChangeHandler) {
   const wrapper = $('<div>', { id: 'last-name' });
   const input = generateTextInput('text', 'שם משפחה', onChangeHandler, name);
   wrapper.append(input);
   return wrapper;
}

function generateMobileNumField(name, onChangeHandler) {
   const wrapper = $('<div>', { id: 'mobile-number', class: 'input-with-icon-wrapper' });
   const icon = $('<img>', { src: './assets/icon-phone-gray.svg', alt: 'icon-phone-gray' });
   const input = generateTextInput('number', 'מספר נייד', onChangeHandler, name);
   input.wrap($('<div>', { class: 'validation-input-wrapper' }));
   const validationWrapper = input.parent();
   return wrapper.append([icon, validationWrapper]);
}

/**  */
function generateTextInput(type, placeholder, onChangeHandler, name) {
   const input = $('<input>', { type, placeholder });
   input.change(function () {
      onChangeHandler(name, $(this).val());
   });
   return input;
}

function generateMobilePrefixField(name, options, defaultValue, onChangeHandler) {
   const originalSelect = createSelectInput();
   const [selectWrapper, styledSelect, styledOptions] = createCustomizeSelect();

   /** Event Handler */
   originalSelect.change(function () {
      onChangeHandler(name, $(this).val());
   });

   styledSelect.click(function (e) {
      e.stopPropagation();
      $(this).toggleClass('active');
      styledOptions.toggle();
   });

   styledOptions.children().click(function (e) {
      e.stopPropagation();
      hideStyledOptions();
      styledSelect.children('span').text($(this).text());
      originalSelect.find(':selected').removeAttr('selected');
      originalSelect
         .find(`[value="${$(this).attr('value')}"]`)
         .attr('selected', 'true')
         .trigger('change');
   });

   $(document).click(function () {
      hideStyledOptions();
   });

   /** Functions */
   function createSelectInput() {
      const selectInput = $('<select>', { id: 'mobile-prefix', name: 'mobile-prefix' });
      options.forEach((optionData) => {
         const option = $('<option>', { value: optionData.value, text: optionData.text });
         optionData.value === defaultValue && option.attr('selected', 'true');
         selectInput.append(option);
      });
      return selectInput;
   }
   function createCustomizeSelect() {
      originalSelect.hide();
      originalSelect.wrap($('<div>', { class: 'select-wrapper' }));
      const selectWrapper = originalSelect.parent();

      const styledSelect = $('<div>', { class: 'styled-select' });
      styledSelect.append($('<span>', { text: originalSelect.find(':selected').text() }));
      styledSelect.append($('<img>', { src: './assets/icon-point-down-arrow.svg' }));

      const styledOptions = $('<ul />', { class: 'styled-options' });
      options.forEach(({ value, text }) => {
         const styledOption = $('<li />', { text, value });
         styledOptions.append(styledOption);
      });

      selectWrapper.append([styledSelect, styledOptions]);

      return [selectWrapper, styledSelect, styledOptions];
   }
   function hideStyledOptions() {
      styledSelect.removeClass('active');
      styledOptions.hide();
   }
   return selectWrapper;
}
