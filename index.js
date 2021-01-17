$(document).ready(() => {
   $('h1').hide();

   $('button').click((event) => {
      console.log('click event');
      console.log(event);
   });

   $('button').on('click', () => {
      console.log('click event');
   });
});
