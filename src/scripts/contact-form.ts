const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${import.meta.env.PUBLIC_CONTACT_EMAIL || 'keunice.elizondo@gmail.com'}`;

export function initContactForm(): void {
  const modal = document.getElementById('contact-modal');
  const backdrop = document.getElementById('contact-modal-backdrop');
  const closeBtn = document.getElementById('contact-modal-close');
  const submitBtn = document.getElementById('contact-form-submit') as HTMLButtonElement | null;
  const errorEl = document.getElementById('contact-form-error');
  const successEl = document.getElementById('contact-form-success');

  if (!modal) return;

  const modalEl = modal;

  function openModal(): void {
    modalEl.classList.remove('opacity-0', 'pointer-events-none');
    modalEl.classList.add('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(): void {
    modalEl.classList.remove('opacity-100', 'pointer-events-auto');
    modalEl.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e: Event) => {
    const trigger = (e.target as HTMLElement).closest('[data-contact-trigger]');
    if (trigger) {
      const formEl = document.getElementById('contact-form') as HTMLFormElement | null;
      if (!formEl) return;
      formEl.reset();
      formEl.classList.remove('hidden');
      submitBtn?.classList.remove('hidden');
      submitBtn?.removeAttribute('disabled');
      submitBtn && (submitBtn.textContent = 'ENVIAR');
      errorEl?.classList.add('hidden');
      successEl?.classList.add('hidden');
      openModal();
    }
  });

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
  });

  document.addEventListener('submit', async (e: Event) => {
    const target = (e.target as HTMLElement).closest('#contact-form') as HTMLFormElement | null;
    if (!target) return;

    e.preventDefault();

    submitBtn!.disabled = true;
    submitBtn!.textContent = 'ENVIANDO...';
    errorEl?.classList.add('hidden');

    const formData = new FormData(target);

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        target.classList.add('hidden');
        submitBtn!.classList.add('hidden');
        successEl?.classList.remove('hidden');
      } else {
        const data = await res.json().catch(() => null);
        errorEl!.textContent = data?.message || 'Something went wrong. Please try again.';
        errorEl?.classList.remove('hidden');
        submitBtn!.disabled = false;
        submitBtn!.textContent = 'ENVIAR';
      }
    } catch {
      errorEl!.textContent = 'Network error. Please check your connection.';
      errorEl?.classList.remove('hidden');
      submitBtn!.disabled = false;
      submitBtn!.textContent = 'ENVIAR';
    }
  });
}
