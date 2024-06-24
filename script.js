'use strict';

// Validation

const formElement = document.getElementById('formValidation');

const visibilityBtn1 = document.getElementById('visibilityBtn1');

function showwHide1() {
  const inputPass1 = document.getElementById('password1Field');
  if (inputPass1.type === 'password') {
    inputPass1.type = 'text';
    visibilityBtn1.classList.remove('fa-eye');
    visibilityBtn1.classList.add('fa-eye-slash');
  } else {
    inputPass1.type = 'password';
    visibilityBtn1.classList.remove('fa-eye-slash');
    visibilityBtn1.classList.add('fa-eye');
  }
}
visibilityBtn1.addEventListener('click', showwHide1);

const visibilityBtn2 = document.getElementById('visibilityBtn2');
function showwHide2() {
  const inputPass2 = document.getElementById('password2Field');
  if (inputPass2.type === 'password') {
    inputPass2.type = 'text';
    visibilityBtn2.classList.remove('fa-eye');
    visibilityBtn2.classList.add('fa-eye-slash');
  } else {
    inputPass2.type = 'password';
    visibilityBtn2.classList.remove('fa-eye-slash');
    visibilityBtn2.classList.add('fa-eye');
  }
}

visibilityBtn2.addEventListener('click', showwHide2);

// Checking password match on keyup
const pass2Field = document.getElementById('password2Field');
pass2Field.addEventListener('keyup', () => {
  const pass1 = document.getElementById('password1Field');
  const pass2 = document.getElementById('password2Field').value;

  if (pass2 !== pass1) {
    errors.password2 = 'Passwords does not match each other';
  }
});

// Password 1 regex

// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const userPass1 = document.getElementById('password1Field');

const validPass1 = () => {
  const passInput1 = document.getElementById('password1Field').value;
  const passP1 = document.getElementById('error-password1');
  const passRegex1 =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (passInput1.match(passRegex1)) {
    passP1.innerHTML = 'Your password is valid!';
    passP1.style.color = 'green';
  } else {
    passP1.innerHTML = 'Your password is invalid!';
    passP1.style.color = 'red';
  }

  const iconBtn1 = document.getElementById('visibilityBtn1');
  iconBtn1.style.visibility = 'visible';

  if (passInput1 === '') {
    passP1.innerHTML = '';
    iconBtn1.style.visibility = 'hidden';
  }
};

userPass1.addEventListener('keyup', validPass1);

// email regex validation

const emailField = document.getElementById('emailField');

function validEmail() {
  const emailValue = document.getElementById('emailField').value;
  const emailErrP = document.getElementById('error-Email');
  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailValue.match(emailPattern)) {
    emailErrP.innerHTML = 'Your Email is valid';
    emailErrP.style.color = 'green';
  } else {
    emailErrP.innerHTML = 'Your Email is invalid';
    emailErrP.style.color = 'red';
  }

  if (emailValue === '') {
    emailErrP.innerHTML = '';
  }
}

emailField.addEventListener('keyup', validEmail);

// Checking on Submit

formElement.addEventListener('submit', function (e) {
  e.preventDefault();

  let errors = {};
  // console.log(this);
  let formItem = this;

  // Checking first and last name fields
  const firstnameField = document.getElementById('firstnameField').value;
  if (firstnameField === '') {
    errors.firstname = 'User first name field can not be empty';
  }

  const lastnameField = document.getElementById('lastnameField').value;
  if (lastnameField === '') {
    errors.lastname = 'User last name field can not be empty';
  }

  // Checking email

  const userEmail = document.getElementById('emailField').value;
  if (userEmail === '') {
    errors.userEmail = 'Email field can not be empty';
  }

  // Checking passwords
  const pass1 = document.getElementById('password1Field').value;
  const pass2 = document.getElementById('password2Field');

  if (pass1 === '') {
    errors.password1 = 'Password field can not be empty';
  }

  if (pass1 !== pass2) {
    errors.password2 = 'Passwords does not match each other';
  }

  // Checking radio buttons
  // working as with  arrays
  let gender = false;
  const radioArray = formItem.querySelectorAll('[name = "gender"]');
  // console.log(radioArray);
  radioArray.forEach((item) => {
    if (item.checked) {
      gender = true;
    }
  });

  if (!gender) {
    errors.gender = 'Please select your gender';
  }

  // Checking checkbox

  const agree = document.getElementById('agreeField').checked;
  if (!agree) {
    errors.agree =
      'Please first, agree the terms and conditions to further actions';
  }

  console.log(errors);

  formItem.querySelectorAll('.error-text').forEach((el) => {
    el.innerText = '';
  });

  for (let item in errors) {
    // console.log(item);Keys of the error object
    //  let errors = {
    //   agree:"Please first, agree the terms and conditions to further actions"
    //   firstname:"User first name field can not be empty"
    //   gender:"Please select your gender"
    //   lastname:"User last name field can not be empty"
    //   password1:"Password field can not be empty"
    //   password2:"Passwords does not match each other"
    // }

    let errorElement = document.getElementById('error-' + item);
    console.log(errorElement);

    if (errorElement) {
      errorElement.innerText = errors[item];
    }
  }
  if (Object.keys(errors) === 0) {
    formItem.submit();
  }
});
