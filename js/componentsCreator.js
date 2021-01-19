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

/** Render Validator inside Input Field */
function renderValidator(field, validationStatus) {
   const validationWrapper = field.find('.validation-input-wrapper')[0];
   if (!validationWrapper) {
      throw Error("Can't render validator on input without validation wrapper");
   }

   $(validationWrapper).removeClass();
   $(validationWrapper).addClass('validation-input-wrapper');

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

/** Generate Custom Select Field */
function generateCustomSelect(id, name, options, defaultValue, onChangeHandler) {
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
      const selectInput = $('<select>', { name: 'mobile-prefix' });
      options.forEach((optionData) => {
         const option = $('<option>', { value: optionData.value, text: optionData.text });
         optionData.value === defaultValue && option.attr('selected', 'true');
         selectInput.append(option);
      });
      return selectInput;
   }
   function createCustomizeSelect() {
      originalSelect.hide();
      originalSelect.wrap($('<div>', { id, class: 'select-wrapper' }));
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

/** Generate Loading Button */
function generateLoadingButton(id, text, onClickHandler) {
   const button = $('<button>', { id, class: 'loading-button', type: 'button' });
   const textSpan = $('<span>', { text });
   const spinner = $('<span>', { class: 'spinner' });
   spinner.hide();
   button.on('click', function (e) {
      onClickHandler();
   });
   return button.append([textSpan, spinner]);
}

/** Render Loader inside Loading Button */
function renderLoader(button, isLoading) {
   const spinner = button.find('.spinner')[0];
   isLoading ? $(spinner).show() : $(spinner).hide();
}

/** Generate Radio Button */
function generateRadioButton(id, value, checked, name, text, onChangeHandler) {
   const field = $('<div>', { id });
   const radioId = Date.now();
   const input = $('<input>', { id: radioId, name, checked, type: 'radio', value, class: 'radio-custom' });
   const label = $('<label>', { for: radioId, text, class: 'radio-custom-label' });
   input.on('change', function () {
      onChangeHandler(name, $(this).val());
   });
   return field.append([input, label]);
}
