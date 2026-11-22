// JavaScript features for the Machine Learning Lab website
document.addEventListener("DOMContentLoaded", function () {
  // 1. Change between light and dark themes and remember the choice.
  const themeButton = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("ml-lab-theme");

  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  function updateThemeButton() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    themeButton.innerHTML = isDark ? "☀️ <span>Light mode</span>" : "🌙 <span>Dark mode</span>";
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  if (themeButton) {
    updateThemeButton();
    themeButton.addEventListener("click", function () {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("ml-lab-theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("ml-lab-theme", "dark");
      }
      updateThemeButton();
    });
  }

  // 2. Open and close the mobile navigation menu.
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-links");

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", isOpen);
      menuButton.querySelector("span").textContent = isOpen ? "Close" : "Menu";
      menuButton.firstChild.textContent = isOpen ? "✕ " : "☰ ";
    });
  }

  // 3. Filter the project cards by category on the Services page.
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project");
  const filterStatus = document.getElementById("filter-status");
  const emptyState = document.getElementById("empty-state");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedCategory = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach(function (item) {
        const isSelected = item === button;
        item.classList.toggle("active", isSelected);
        item.setAttribute("aria-pressed", isSelected);
      });

      projects.forEach(function (project) {
        const shouldShow = selectedCategory === "all" ||
                           project.dataset.category === selectedCategory;
        project.hidden = !shouldShow;
        if (shouldShow) visibleCount++;
      });

      filterStatus.textContent = "Showing " + visibleCount + " project" +
        (visibleCount === 1 ? "" : "s") + ".";
      emptyState.hidden = visibleCount !== 0;
    });
  });

  // 4. Count message characters and validate the contact form.
  const messageBox = document.getElementById("message");
  const charCount = document.getElementById("char-count");
  const contactForm = document.getElementById("contact-form");

  if (messageBox && charCount) {
    messageBox.addEventListener("input", function () {
      charCount.textContent = messageBox.value.length + " / 500 characters";
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const success = document.getElementById("form-success");

      document.getElementById("name-error").textContent =
        name.value.trim().length < 2 ? "Please enter a name with at least 2 characters." : "";
      document.getElementById("email-error").textContent =
        email.validity.valid ? "" : "Please enter a valid email address.";
      document.getElementById("message-error").textContent =
        message.value.trim().length < 10 ? "Your message must contain at least 10 characters." : "";

      const isValid = name.value.trim().length >= 2 &&
                      email.validity.valid &&
                      message.value.trim().length >= 10;

      if (isValid) {
        success.hidden = false;
        contactForm.reset();
        charCount.textContent = "0 / 500 characters";
      } else {
        success.hidden = true;
      }
    });
  }

  // Display the current year in the footer.
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
});
