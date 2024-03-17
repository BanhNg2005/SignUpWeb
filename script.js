function showMessage(input, message, type) {
    const msg = input.parentNode.querySelector("small");
    msg.innerText = message;
    input.className = type ? "success" : "error";
    return type;
  }
   
function showError(input, message) {
  const small = input.parentNode.querySelector("small");
  small.textContent = message;
  small.className = 'error';
  return showMessage(input, message, false);
}
   
function showSuccess(input) {
  return showMessage(input, "", true);
}
   
function hasValue(input, message) {
  if (input.value.trim() === "") {
    return showError(input, message);
  }
    return showSuccess(input);
}

function remove_add_city() {
  var x = document.getElementById("citylist");
  for (var i = 0; i < x.length; i++) {
      if (x.options[i].value == "4") {
        x.remove(i);
      }
    }
    x.remove(x.selectedIndex);
  }
   
  function validateEmail(input, requiredMsg, invalidMsg) {
    // check if the value is not empty
    if (!hasValue(input, requiredMsg)) {
      return false;
    }
    // validate email format
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    const email = input.value.trim();
    if (!emailRegex.test(email)) {
      return showError(input, invalidMsg);
    }
    return true;
}

// function to validate postal code
function validatePostalCode(input, requiredMsg, invalidMsg) {
  if (!hasValue(input, requiredMsg)) {
      return false;
  }
  const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/; 
  const postalCode = input.value.trim();
  if (!postalCodeRegex.test(postalCode)) {
      return showError(input, invalidMsg);
  }
  return true;
}

// function to remove and add city
let cityIndex = 0;
const cities = ['Toronto', 'Laval', 'Vancouver', 'Brossard', "Calgary", "Edmonton", "Ottawa", "Montreal"];

function remove_add_city() {
  const cityDropdown = document.getElementById('citylist');
  const selectedCity = cityDropdown.options[cityDropdown.selectedIndex];
  selectedCity.value = cities[cityIndex];
  selectedCity.text = cities[cityIndex];
  cityIndex = (cityIndex + 1) % cities.length;
}
   
// function to validate password
  function validatePassword(input, requiredMsg, invalidMsg) {
  const errors = [];
   
  if (!hasValue(input, requiredMsg)) {
    return false;
}
  const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  const password = input.value.trim();
  if (!passwordRegex.test(password)) {
    return showError(input, invalidMsg);
}
  return true;
}


// function to validate retype password
function validateRetypePassword(input, originalPassword, requiredMsg, mismatchMsg) {
  if (!hasValue(input, requiredMsg)) {
      return false;
  }
  if (input.value.trim() !== originalPassword.value.trim()) {
      return showError(input, mismatchMsg);
  }
  return true;
}
   
  const form = document.querySelector("#signup");
  const password = document.querySelector('#password');
  const password2 = document.querySelector('#password2');
  const togglePassword = document.querySelector('#togglePassword');
  const togglePassword2 = document.querySelector('#togglePassword2');
   
  const FIRSTNAME_REQUIRED = "Please enter your first name!";
  const LASTNAME_REQUIRED = "Please enter your last name!";
  const EMAIL_REQUIRED = "Please enter your email!";
  const EMAIL_INVALID = "Please enter a correct email address format!";
  const POSTAL_REQUIRED = "Please enter your postal code!";
  const POSTAL_INVALID = "Please enter a valid postal code!";
  const PASSWORD_REQUIRED = "Please enter a password!";
  const PASSWORD_MISMATCH = "The passwords do not match!";
  const PASSWORD_INVALID = "The password must be AT LEAST 6 characters, at least one number, one capital and one special character!";
  const passwordInput = document.getElementById("passwordInput");
  const toggleVisibility = document.getElementById("toggleVisibility");
  const password2Input = document.getElementById("password2Input");
  const toggleVisibility2 = document.getElementById("toggleVisibility2");

  toggleVisibility.addEventListener("change", function () {
    if (toggleVisibility.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
});
toggleVisibility2.addEventListener("change", function () {
    if (toggleVisibility2.checked) {
        password2Input.type = "text";
    } else {
        password2Input.type = "password";
    }
});

  form.addEventListener("submit", function (event) {
    event.preventDefault();
   
    let firstnameValid = hasValue(form.elements["firstname"], FIRSTNAME_REQUIRED);
    let lastnameValid = hasValue(form.elements["lastname"], LASTNAME_REQUIRED);
    let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
    let postalValid = validatePostalCode(form.elements["postal"], POSTAL_REQUIRED, POSTAL_INVALID);
    let passwordValid = validatePassword(document.getElementById("passwordInput"), PASSWORD_REQUIRED, PASSWORD_INVALID);
    let password2Valid = validateRetypePassword(document.getElementById("password2Input"), document.getElementById("passwordInput"), PASSWORD_REQUIRED, PASSWORD_MISMATCH);

      // submit the form if all the validations are successful
      if (firstnameValid && lastnameValid && emailValid && postalValid && passwordValid && password2Valid) {
        let confirmation = confirm("Are you sure you want to submit the form?");
        if (confirmation) {
            let data = `
                First Name: ${form.elements["firstname"].value.trim()}
                Last Name: ${form.elements["lastname"].value.trim()}
                Email: ${form.elements["email"].value.trim()}
                City: ${form.elements["citylist"].value.trim()}
                Postal Code: ${form.elements["postal"].value.trim()}
                Password: ${form.elements["passwordInput"].value.trim()}
            `;
            let finalConfirmation = confirm(data + " \n Do you want to download your data information?");  
            
            if (finalConfirmation) {
                let blob = new Blob([data], { type: 'text/plain' });
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'yourname_data.txt';
                a.click();
            }
        }
    }
    // if the form is not valid, show an error message
    else {
        alert("Please fill in the form correctly!");
        event.preventDefault();
    }
  }
);