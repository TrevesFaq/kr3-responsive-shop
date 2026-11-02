const orderDialog = document.getElementById('order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const successMessage = document.getElementById('success-message');

document.querySelectorAll('button[data-product]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!orderDialog || !selectedProductInput) return;
    selectedProductInput.value = button.dataset.product;
    if (successMessage) successMessage.hidden = true;
    orderDialog.showModal();
  });
});

document.getElementById('close-order-dialog')?.addEventListener('click', () => {
  orderDialog?.close();
});

document.querySelectorAll('.order-form').forEach((form) => {
  form.addEventListener('input', (event) => {
    event.target.removeAttribute('aria-invalid');
    if (successMessage) successMessage.hidden = true;
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = Array.from(form.elements).filter((field) => field.willValidate);
    fields.forEach((field) => {
      field.removeAttribute('aria-invalid');
      if (!field.checkValidity()) field.setAttribute('aria-invalid', 'true');
    });
    if (!form.reportValidity()) return;
    form.reset();
    orderDialog?.close();
    if (successMessage) {
      successMessage.hidden = false;
      successMessage.scrollIntoView({ block: 'nearest' });
    }
  });
});
