// Получаем элементы модального окна и формы заявки.
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('button.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.querySelector('.order-form');
const successMessage = document.getElementById('success-message');
let lastOrderButton;

// Открываем модальное окно и записываем выбранный товар.
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    lastOrderButton = button;
    selectedProductInput.value = button.dataset.product;
    successMessage.hidden = true;
    orderDialog.showModal();
  });
});

if (closeDialogButton) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });

  // Возвращаем фокус к кнопке заказа после закрытия, в том числе по Escape.
  orderDialog.addEventListener('close', () => {
    lastOrderButton.focus();
  });
}

// Проверяем форму без отправки на сервер: backend пока не подключён.
if (orderForm) {
  // Убираем устаревшую ошибку, когда пользователь исправляет поле.
  orderForm.addEventListener('input', (event) => {
    const field = event.target;
    const error = document.getElementById(field.id + '-error');
    field.removeAttribute('aria-invalid');
    if (error) {
      error.hidden = true;
      error.textContent = '';
    }
    successMessage.hidden = true;
  });

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);
    let firstInvalidField;
    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
        const error = document.getElementById(element.id + '-error');
        if (error) {
          error.hidden = true;
          error.textContent = '';
        }
      }
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
          const error = document.getElementById(element.id + '-error');
          error.textContent = element.validationMessage;
          error.hidden = false;
          if (!firstInvalidField) {
            firstInvalidField = element;
          }
        }
      });
      firstInvalidField.focus();
      return;
    }

    successMessage.hidden = false;
    orderForm.reset();
    if (orderDialog) {
      orderDialog.close();
    }
  });
}
