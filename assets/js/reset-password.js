let resetPasswordForm = document.getElementById("reset-password-form");
let email = document.getElementById("email");
let resetPasswordRes = document.getElementById("rest-password-res");
let resetPasswordSucc = document.getElementById("rest-password-succ");
let resetPasswordFailed = document.getElementById("rest-password-failed");

resetPasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  if(email.value === "") {
    valid = false
  }
  if (valid) {
    resetPasswordRes.classList.remove("hidden");
    resetPasswordRes.classList.add("flex");
    resetPasswordSucc.classList.remove("hidden");
    email.value = "";
  }else {
    resetPasswordRes.classList.remove("hidden");
    resetPasswordRes.classList.add("flex");
    resetPasswordFailed.classList.remove("hidden");
  }
})

resetPasswordRes.addEventListener("click", () => {
  resetPasswordRes.classList.remove("flex");
  resetPasswordRes.classList.add("hidden");
  resetPasswordSucc.classList.add("hidden");
  resetPasswordFailed.classList.add("hidden");
})