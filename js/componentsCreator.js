/** Basic */
function generateLastNameField(name, onChangeHandler) {
   const field = generateTextInput('last-name', name, 'text', 'שם משפחה', onChangeHandler);
   return field;
}

/** Validation */
function generateMobileNumField(name, onChangeHandler) {
   const field = generateTextInput('mobile-number', name, 'number', 'מספר נייד', onChangeHandler);
   addSideIconToTextInput(field, './assets/icon-phone-gray.svg');
   addValidationIndicatorToTextInput(field);
   return field;
}

/** Generate Base Text Input Field */
function generateTextInput(id, name, type, placeholder, onChangeHandler) {
   const field = $('<div>', { id });
   const input = $('<input>', { type, placeholder });
   input.change(function () {
      onChangeHandler(name, $(this).val());
   });
   return field.append(input);
}

/** Add Side Icon Text Input Field */
function addSideIconToTextInput(field, iconSrc) {
   field.addClass('input-with-icon-wrapper');
   const icon = $('<img>', { src: iconSrc });
   field.prepend(icon);
}

/** Add Validation Indicator Into Text Input Field */
function addValidationIndicatorToTextInput(field) {
   const input = field.find('input')[0];
   $(input).wrap($('<div>', { class: 'validation-input-wrapper' }));
}

/** Render validator ui inside input field */
function renderValidator(field, validationStatus) {
   const validationWrapper = field.find('.validation-input-wrapper')[0];
   if (!validationWrapper) {
      throw Error("Can't render validator on input without validation wrapper");
   }

   switch (validationStatus) {
      case 'success':
      case 'invalid':
      case 'complete':
         $(validationWrapper).addClass(validationStatus);
         break;
      default:
         throw Error('Invalid validation status');
   }
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

function generateLoadingButton(onClickHandler) {
   const button = $('<button>', { id: 'btn-test', class: 'loading-button' });
   const text = $('<span>', { text: 'אמת מספר' });
   const spinner = $('<span>', { class: 'spinner' });
   spinner.hide();
   button.click(function (e) {
      e.preventDefault();
      onClickHandler();
   });
   return button.append([text, spinner]);
}
