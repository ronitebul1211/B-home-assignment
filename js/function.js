/** Test if israeli mobile number */
function isValidMobileNum(mobileNum) {
   const shortPattern = /^[5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$/g;
   const longPattern = /^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$/g;
   return shortPattern.test(mobileNum) || longPattern.test(mobileNum);
}
