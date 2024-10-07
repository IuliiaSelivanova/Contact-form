let inputsCount = -1;
let validInput = 0;

function validateInput(input) {
  const errorTextContainer = document.querySelector(`p#${input.getAttribute('name')}-error`);
  let isInputValid = true;

  if (!input.checkValidity()) {
      isInputValid = false;
      errorTextContainer.innerHTML = input.validationMessage;
      console.log(input.validationMessage)
  } else {
      errorTextContainer.innerHTML = '';
  }


  return isInputValid;
}

function onInputChange(e) {
  if (validateInput(e.target)) {
      validInput++;
      console.log("validInput", validInput)
  }
  setButtonEnabled();
}

function subscribeInputsChange() {
  const inputs = document.querySelectorAll('.input');

  inputsCount = inputs.length;
  validInput = 0;

  inputs.forEach((input) => {
      input.addEventListener('change', onInputChange);
  })
}

function unsubscribeInputsChange() {
  const inputs = document.querySelectorAll('.input');
  
  inputs.forEach((input) => {
      input.removeEventListener('change', onInputChange);
  })
}

function setButtonEnabled() {
  const shouldBeEnabled = inputsCount === validInput;
  console.log("inputs", inputsCount)

  if (shouldBeEnabled) {
    submitBtn.removeAttribute('disabled');
  } else {
    submitBtn.setAttribute('disabled', 1);
  }
}

// Маска номера телефона jquery
$(function(){
  $("input[name='phone']").mask("+7(999)999-99-99");
});

function sendForm(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const data = new FormData(form);

  fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: data,
  })
  .then(res => res.json())
  .then(console.log)
  .catch((e) => {
    console.log(e);
    form.reset();
  });
} 

window.addEventListener('load', () => {
  const form = document.forms.namedItem('contact-form');
  // form.addEventListener('submit', sendForm);

  submitBtn = document.getElementById('submit-form-btn');

  subscribeInputsChange();
})