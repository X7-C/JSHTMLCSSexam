document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.includes('search.html')) {
    initRecipeSearch();
  }

  if (path.includes('contact.html')) {
    initContactForm();
  }

  if (path.includes('newsletter.html')) {
    initNewsletterForm();
  }
});
