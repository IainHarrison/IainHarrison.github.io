/*eslint-env es6*/
var document;

// Select all elements that need to be clickable
const modalTriggers = document.querySelectorAll('[data-modal-target]');
const externalLinkTriggers = document.querySelectorAll('[data-external-link]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

// Add click events to modal triggers (works that open modals)
modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const modal = document.querySelector(trigger.dataset.modalTarget);
    openModal(modal);
  });
});

// Add click events to external link triggers (works that link to external sites)
externalLinkTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    window.open(trigger.dataset.externalLink, '_blank');
  });
});

// Close modal when clicking overlay
overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    closeModal(modal);
  });
});

// Close modal when clicking close button
closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

// Function to open modal
function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
  document.body.classList.add('modal-open');
}

// Function to close modal
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
  document.body.classList.remove('modal-open');
}