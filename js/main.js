// Получаем элементы модального окна и формы заявки.
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('button.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.querySelector('.order-form');
const successMessage = document.getElementById('success-message');

// Открываем модальное окно и записываем выбранный товар.
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedProductInput.value = button.dataset.product;
    successMessage.hidden = true;
    orderDialog.showModal();
  });
});

if (closeDialogButton) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

// Проверяем форму без отправки на сервер: backend пока не подключён.
if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);
    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      orderForm.reportValidity();
      return;
    }

    successMessage.hidden = false;
    orderForm.reset();
    if (orderDialog) {
      orderDialog.close();
    }
  });
}
