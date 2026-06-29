// ============================================
//  BUILDIT — APP ENTRY POINT
// ============================================

// ---- BOOT ----
document.addEventListener('DOMContentLoaded', () => {
  Builder.init();

  // Animate hero slots on load
  setTimeout(() => {
    const slots = document.querySelectorAll('.comp-slot');
    slots.forEach((s, i) => {
      setTimeout(() => s.classList.add('active'), i * 300);
    });
    setTimeout(() => {
      slots.forEach(s => s.classList.remove('active'));
    }, slots.length * 300 + 600);
  }, 800);
});

// ---- GLOBAL ACTIONS ----

function scrollToBuilder() {
  document.getElementById('builder').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setService(type) {
  Builder.setService(type);
}

function clearBuild() {
  if (confirm('هل تريد مسح جميع القطع المختارة؟')) {
    Builder.clearBuild();
  }
}

function submitOrder() {
  const state = Builder.getState();
  const hasParts = Object.keys(state.build).length > 0;
  if (!hasParts) return;

  // Show summary in modal
  const summaryBox = document.getElementById('orderSummaryBox');
  summaryBox.innerHTML = Builder.getBuildSummary()
    .split('\n')
    .map(line => `<div>${line}</div>`)
    .join('');

  document.getElementById('orderModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('orderModal').style.display = 'none';
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.id === 'orderModal') closeModal();
});

// Escape key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ---- NAVBAR SCROLL EFFECT ----
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.style.borderBottomColor = window.scrollY > 50
    ? 'rgba(0, 212, 255, 0.18)'
    : 'rgba(0, 212, 255, 0.08)';
});
