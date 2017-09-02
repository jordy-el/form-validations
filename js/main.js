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

function handleValidationClass(array) {
  const valid = array[0];
  const $element = array[1];
  if ($element.hasClass('valid') && !valid) {
    $element.removeClass('valid');
    $element.addClass('invalid');
  } else if ($element.hasClass('invalid') && valid) {
    $element.removeClass('invalid');
    $element.addClass('valid');
  } else {
    $element.addClass(validationClass(valid));
  }
}

function main() {

  // Initialize booleans to prevent overfilling queue array
  let email = false;
  let confirmEmail = false;
  let phone = false;
  let password = false;
  let confirmPassword = false;

  // Initialize queue for validations
  let checkQueue = [];

  // Add focusout handlers for pushing input elements into validation array
  $('#email').focusout(() => { if (!email) checkQueue.push(validateEmail); email = true });
  $('#confirm-email').focusout(() => { if (!confirmEmail) checkQueue.push(validateEmailConfirmation); confirmEmail = true });
  $('#phone').focusout(() => { if (!phone) checkQueue.push(validatePhone); phone = true });
  $('#password').focusout(() => { if (!password) checkQueue.push(validatePassword); password = true });
  $('#confirm-password').focusout(() => { if (!confirmPassword) checkQueue.push(validatePasswordConfirmation); confirmPassword = true });

  // Validate all in queue
  $('input').focusout(() => { checkQueue.forEach((validation) => {
    const $check = validation();
    handleValidationClass($check);
  }); });
}
