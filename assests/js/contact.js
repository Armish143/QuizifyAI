// contact.js — client side validation, file preview, local draft, submit to /api/contact
(() => {
  const el = id => document.getElementById(id);
  const form = document.getElementById('contact-form');
  const nameInput = el('name');
  const emailInput = el('email');
  const subjectInput = el('subject');
  const messageInput = el('message');
  const categoryInput = el('category');
  const attachment = el('attachment');
  const attachPreview = el('attach-preview');
  const clearAttachBtn = el('clear-attach');
  const sendBtn = el('send-btn');
  const saveDraftBtn = el('save-draft');
  const feedback = el('contact-feedback');
  const LS_KEY = 'quizify_contact_draft_v1';

  // restore draft
  function restoreDraft() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const obj = JSON.parse(raw);
      if (obj.name) nameInput.value = obj.name;
      if (obj.email) emailInput.value = obj.email;
      if (obj.subject) subjectInput.value = obj.subject;
      if (obj.message) messageInput.value = obj.message;
      if (obj.category) categoryInput.value = obj.category;
      if (obj.attachmentName) attachPreview.textContent = obj.attachmentName;
      showFeedback('Draft restored', 1500);
    } catch (e) { console.warn('restore failed', e); }
  }

  function showFeedback(msg, ms = 2500) {
    feedback.textContent = msg;
    setTimeout(() => { if (feedback.textContent === msg) feedback.textContent = ''; }, ms);
  }

  // file preview
  attachment.addEventListener('change', () => {
    const file = attachment.files[0];
    if (!file) { attachPreview.textContent = ''; return; }
    attachPreview.textContent = `${file.name} (${Math.round(file.size/1024)} KB)`;
  });
  clearAttachBtn.addEventListener('click', () => {
    attachment.value = '';
    attachPreview.textContent = '';
  });

  // save draft
  saveDraftBtn.addEventListener('click', () => {
    const obj = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim(),
      category: categoryInput.value,
      attachmentName: attachment.files[0] ? attachment.files[0].name : ''
    };
    localStorage.setItem(LS_KEY, JSON.stringify(obj));
    showFeedback('Draft saved locally');
  });

  // form validation
  function validate() {
    let ok = true;
    // name
    if (!nameInput.value.trim()) { nameInput.classList.add('is-invalid'); ok = false; } else nameInput.classList.remove('is-invalid');
    // email
    const mail = emailInput.value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(mail)) { emailInput.classList.add('is-invalid'); ok = false; } else emailInput.classList.remove('is-invalid');
    // message
    if (!messageInput.value.trim()) { messageInput.classList.add('is-invalid'); ok = false; } else messageInput.classList.remove('is-invalid');
    return ok;
  }

  // submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) { showFeedback('Please complete required fields'); return; }

    sendBtn.disabled = true;
    const prevText = sendBtn.textContent;
    sendBtn.textContent = 'Sending...';

    // Prepare payload. If file present, use FormData; otherwise JSON.
    try {
      let response;
      if (attachment.files[0]) {
        const fd = new FormData();
        fd.append('name', nameInput.value.trim());
        fd.append('email', emailInput.value.trim());
        fd.append('subject', subjectInput.value.trim());
        fd.append('message', messageInput.value.trim());
        fd.append('category', categoryInput.value);
        fd.append('attachment', attachment.files[0]);

        response = await fetch('/api/contact', { method: 'POST', body: fd });
      } else {
        const payload = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: subjectInput.value.trim(),
          message: messageInput.value.trim(),
          category: categoryInput.value
        };
        response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (!response.ok) {
        const text = await response.text();
        throw new Error(response.status + ' ' + text);
      }

      // success
      showFeedback('Message sent — thank you!', 4000);
      form.reset();
      attachPreview.textContent = '';
      localStorage.removeItem(LS_KEY);
    } catch (err) {
      console.error('contact submit failed', err);
      showFeedback('Failed to send message — try again later');
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = prevText;
    }
  });

  // init
  restoreDraft();
})();
