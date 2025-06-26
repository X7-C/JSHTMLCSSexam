function initContactForm() {
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('contact-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form['contact-name'].value.trim();
    const email = form['contact-email'].value.trim();
    const message = form['message'].value.trim();

    if (!name || !email || !message) {
      msg.textContent = "Please fill out all fields.";
      msg.style.color = "red";
      return;
    }

    if (!validateEmail(email)) {
      msg.textContent = "Please enter a valid email address.";
      msg.style.color = "red";
      return;
    }

    msg.textContent = "Message sent! We'll get back to you soon <3";
    msg.style.color = "green";
    form.reset();
  });
}

function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const msg = document.getElementById('newsletter-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form['name'].value.trim();
    const email = form['email'].value.trim();

    if (!name || !email) {
      msg.textContent = "Please fill out all fields.";
      msg.style.color = "red";
      return;
    }

    if (!validateEmail(email)) {
      msg.textContent = "Please enter a valid email address.";
      msg.style.color = "red";
      return;
    }

    msg.textContent = `Thanks for subscribing, ${name}! <3`;
    msg.style.color = "green";
    form.reset();
  });
}

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
  initNewsletterForm();
});
