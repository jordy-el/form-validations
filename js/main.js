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

function validatePassword() {
  const $password = $('#password');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const valid = (passwordRegex.test($password[0].value));
  return [valid, $password];
}

function validatePasswordWhileTyping() {
  const password = $('#password')[0].value;
  const lowerCaseRegex = /[a-z]+/;
  const upperCaseRegex = /[A-Z]+/;
  const numberRegex = /[0-9]+/;
  const symbolRegex = /[!@#\$%\^&\*]+/;
  return {
    lower: lowerCaseRegex.test(password),
    upper: upperCaseRegex.test(password),
    number: numberRegex.test(password),
    symbol: symbolRegex.test(password),
    length: password.length >= 8
  }
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

function handleValidationMessage(array) {
  const valid = array[0];
  const $element = array[1];
  if (valid) {
    $element.next('span').hide();
  } else if (!valid) {
    $element.next('span').show();
  }
}

function main() {

  // Declare validation function
  const handleValidation = () => {
    checkQueue.forEach((validation) => {
      const $check = validation();
      handleValidationClass($check);
      handleValidationMessage($check);
    })
  };

  // Initialize jquery nodes for each input element
  const $email = $('#email');
  const $confirmEmail = $('#confirm-email');
  const $password = $('#password');
  const $confirmPassword = $('#confirm-password');

  // Initialize jquery node for all input elements
  const $input = $('input');

  // Initialize tooltips for inputs
  $('input[title]').qtip({
    position: {
      my: 'center left',
      at: 'center right'
    },
    style: {
      classes: 'qtip-dark',
    },
    show: 'focus',
    hide: 'blur'
  });

  // Hide error messages initially
  $('fieldset > span').hide();

  // Hide password validity list initially
  $('#password-list').hide();

  // Initialize booleans to prevent overfilling queue array
  let email = false;
  let confirmEmail = false;
  let password = false;
  let confirmPassword = false;

  // Initialize queue for validations
  let checkQueue = [];

  // Add focusout/keyup handlers for pushing input elements into validation array
  $email.focusout(() => { if (!email) checkQueue.push(validateEmail); email = true });
  $confirmEmail.keyup(() => { if (!confirmEmail) checkQueue.push(validateEmailConfirmation); confirmEmail = true });
  $confirmEmail.focusout(() => { if (!confirmEmail) checkQueue.push(validateEmailConfirmation); confirmEmail = true });
  $password.keyup(() => { if (!password) checkQueue.push(validatePassword); password = true });
  $password.focusout(() => { if (!password) checkQueue.push(validatePassword); password = true });
  $confirmPassword.keyup(() => { if (!confirmPassword) checkQueue.push(validatePasswordConfirmation); confirmPassword = true });
  $confirmPassword.focusout(() => { if (!confirmPassword) checkQueue.push(validatePasswordConfirmation); confirmPassword = true });

  // Validate password while typing
  $password.focusin(() => {
    $('#password-list').animate({ height: 'toggle' }, 400);
  });
  $password.focusout(() => {
    $('#password-list').animate({ height: 'toggle' }, 400);
  });
  $password.keyup(() => {
    const passwordValidity = validatePasswordWhileTyping();
    const $lowerCase = $('#lower-case');
    const $upperCase = $('#upper-case');
    const $number = $('#number');
    const $symbol = $('#symbol');
    const $passwordLength = $('#password-length');
    if ($lowerCase.hasClass('password-valid') && !passwordValidity.lower) {
      $lowerCase.removeClass('password-valid');
    } else if (!$lowerCase.hasClass('password-valid') && passwordValidity.lower) {
      $lowerCase.addClass('password-valid');
    }
    if ($upperCase.hasClass('password-valid') && !passwordValidity.upper) {
      $upperCase.removeClass('password-valid');
    } else if (!$upperCase.hasClass('password-valid') && passwordValidity.upper) {
      $upperCase.addClass('password-valid');
    }
    if ($number.hasClass('password-valid') && !passwordValidity.number) {
      $number.removeClass('password-valid');
    } else if (!$number.hasClass('password-valid') && passwordValidity.number) {
      $number.addClass('password-valid');
    }
    if ($symbol.hasClass('password-valid') && !passwordValidity.symbol) {
      $symbol.removeClass('password-valid');
    } else if (!$symbol.hasClass('password-valid') && passwordValidity.symbol) {
      $symbol.addClass('password-valid');
    }
    if ($passwordLength.hasClass('password-valid') && !passwordValidity.length) {
      $passwordLength.removeClass('password-valid');
    } else if (!$passwordLength.hasClass('password-valid') && passwordValidity.length) {
      $passwordLength.addClass('password-valid');
    }
  });

  // Validate all in queue on focusout anywhere
  $input.focusout(handleValidation);

  // Validate all in queue on keyup anywhere
  $input.keyup(handleValidation);

  // Block form submission unless all inputs are valid
  $('#signup-form').submit(() => {
    if ($('input.valid').length !== 4) {
      return false;
    }
  });
}
