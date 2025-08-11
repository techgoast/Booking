const navLinks = document.getElementById("nav-links");
const loginBtn = document.getElementById("login-btn");
const navMenue = document.getElementById("nav-menue");

navMenue.addEventListener("click", () => {
  navLinks.toggleAttribute("data-display");
  loginBtn.toggleAttribute("data-display");
});
