const contactSubmitRes = document.getElementById("contact-submit-res");
const contactSubmitSuccess = document.getElementById("contact-res-succ");
const contactSubmitFailed = document.getElementById("contact-res-failed");
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formInputs = document.querySelectorAll("#contact-form input, #contact-form textarea");
  let valid = true;
  let formData = new FormData(contactForm);
  let formObj = Object.fromEntries(formData.entries());
  for (const val of Object.values(formObj)) {
    if (val === "") {
      valid = false;
      break;
    }
  }
  if (!valid) {
    contactSubmitRes.classList.remove("hidden");
    contactSubmitRes.classList.add("flex");
    contactSubmitFailed.classList.remove("hidden");
  } else {
    contactSubmitRes.classList.remove("hidden");
    contactSubmitRes.classList.add("flex");
    contactSubmitSuccess.classList.remove("hidden");
    for (const inp of formInputs) {
      inp.value = ""
    }
  }
})

contactSubmitRes.addEventListener("click", () => {
  contactSubmitRes.classList.remove("flex");
  contactSubmitRes.classList.add("hidden");
  contactSubmitFailed.classList.add("hidden");
  contactSubmitSuccess.classList.add("hidden");
})