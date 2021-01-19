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
