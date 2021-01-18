$(document).ready(() => {
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
