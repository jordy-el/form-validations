'use strict';

$(document).ready(main);

function validationClass(valid) {
  return valid ? 'valid' : 'invalid'
}

function validateEmail() {
  const $email = $('#email');
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return [emailRegex.test($email[0].value), $email];
}

function validateEmailConfirmation() {
  const $email = $('#email');
  const $emailConfirmation = $('#confirm-email');
  return [$email[0].value === $emailConfirmation[0].value, $emailConfirmation];
}

function validatePhone() {
  const $phone = $('#phone');
  return [$phone[0].value !== '', $phone];
}

function validatePassword() {
  const $password = $('#password');
  return [$password[0].value.length > 6, $password];
}

function validatePasswordConfirmation() {
  const $password = $('#password');
  const $passwordConfirmation = $('#confirm-password');
  return [$password[0].value === $passwordConfirmation[0].value, $passwordConfirmation];
}

function main() {

  // Initialize queue for validations
  const checkQueue = [];

  // Add focusout handlers for pushing input elements into validation array
  $('#email').focusout(() => { checkQueue.push(validateEmail) });
  $('#confirm-email').focusout(() => { checkQueue.push(validateEmailConfirmation) });
  $('#phone').focusout(() => { checkQueue.push(validatePhone) });
  $('#password').focusout(() => { checkQueue.push(validatePassword) });
  $('#confirm-password').focusout(() => { checkQueue.push(validatePasswordConfirmation) });

  // Validate all in queue
  $('input').focusout(() => { checkQueue.forEach((validation) => {
    const $valid = validation();
    console.log($valid);
  }); });
}
