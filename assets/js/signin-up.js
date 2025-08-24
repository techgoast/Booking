let signinForm = document.getElementById("signin-form");
let signinRes = document.getElementById("signin-res");
let signinSuccess = document.getElementById("signin-success");
let signinFailed = document.getElementById("signin-failed");

let signUpForm = document.getElementById("signup-form");
let signUpRes = document.getElementById("signup-res");
let signUpSuccess = document.getElementById("signup-success");
let foundUserRes = document.getElementById("found-user");
let signUpFailed = document.getElementById("signup-failed");

let users = [];

window.addEventListener("load", async () => {
  let res = await fetch("./assets/apis/users.json");
  let data = await res.json();
  users = [...data];
})

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formInputs = document.querySelectorAll("#signin-form input");
  let formData = new FormData(signinForm);
  let formObj = Object.fromEntries(formData.entries());
  let valid = false;
  let [loggingUser] = users.filter(user => {
    return user.userName === formObj["signin-user-name"]
  })
  if(loggingUser && loggingUser.password === +formObj["signin-password"]) {
    valid = true;
  }
  if (valid) {
    signinRes.classList.remove("hidden");
    signinRes.classList.add("flex");
    signinSuccess.classList.remove("hidden");
    formInputs.forEach(input => {
      input.value = "";
    })
  }else {
    signinRes.classList.remove("hidden");
    signinRes.classList.add("flex");
    signinFailed.classList.remove("hidden");
  }
})

signinRes.addEventListener("click", () => {
  signinRes.classList.remove("flex");
  signinRes.classList.add("hidden");
  signinSuccess.classList.add("hidden");
  signinFailed.classList.add("hidden");
})

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formInputs = document.querySelectorAll("#signup-form input");
  let pass = document.querySelector("#signup-form input[name=signup-password]");
  let confirmPass = document.querySelector("#signup-form input[name=confirm-password]");
  let formData = new FormData(signUpForm);
  let formObj = Object.fromEntries(formData.entries());
  let valid = true;
  let existingUser = false;
  let [foundUser] = users.filter(user => {
    return user.userName === formObj["signup-user-name"]
  })
  
  for (const val of Object.values(formObj)) {
    if(val === "" || pass.value !== confirmPass.value) {
      valid = false;
      break;
    }
  }

  if(foundUser) {
    existingUser = true;
  }

  if(existingUser && valid) {
    signUpRes.classList.remove("hidden");
    signUpRes.classList.add("flex");
    foundUserRes.classList.remove("hidden");
  }else if (valid) {
    signUpRes.classList.remove("hidden");
    signUpRes.classList.add("flex");
    signUpSuccess.classList.remove("hidden");
    formInputs.forEach(input => {
      input.value = "";
    })
  }else {
    signUpRes.classList.remove("hidden");
    signUpRes.classList.add("flex");
    signUpFailed.classList.remove("hidden");
  }
})

signUpRes.addEventListener("click", () => {
  signUpRes.classList.remove("flex");
  signUpRes.classList.add("hidden");
  signUpSuccess.classList.add("hidden");
  foundUserRes.classList.add("hidden");
  signUpFailed.classList.add("hidden");
})