/** Функция валидации всех форм */
export const enableValidation = (config) => {
  // Получаем массив всех форм, используя переданный селектор формы из конфигурации
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Перебираем каждую форму в списке
  formList.forEach((form) => {
    // Добавляем обработчик события для отключения стандартного поведения отправки формы
    form.addEventListener('submit', disableSubmit);
    
    // Добавляем обработчик события input для каждой формы для переключения состояния кнопки отправки
    form.addEventListener('input', () => toggleButton(form, config));
    
    // Добавляем слушатели событий для всех инпутов формы
    addInputListeners(form, config);
    
    // Переключаем состояние кнопки при загрузке страницы
    toggleButton(form, config);
  });
};

/** Функция отключения перезагрузки */
const disableSubmit = (evt) => {
  // Отменяем стандартное поведение отправки формы
  evt.preventDefault();
};

/** Функция вывода сообщения валидации */
const handleFormInput = (evt, config) => {
  // Получаем элемент, вызвавший событие
  const input = evt.target;
  
  // Находим элемент ошибки, связанный с этим инпутом по его ID
  const errorElement = document.querySelector(`#${input.id}-error`);

  // Проверяем валидность инпута
  if (input.validity.valid) {
    // Если инпут валиден, удаляем класс ошибки и очищаем сообщение об ошибке
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  } else {
    // Если инпут не валиден, добавляем класс ошибки и отображаем сообщение валидации
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }
};

/** Функция переключения кнопки submit */
const toggleButton = (form, config) => {
  // Находим кнопку отправки внутри формы по селектору из конфигурации
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  
  // Проверяем валидность всей формы
  const isFormValid = form.checkValidity();
  
  // Блокируем или разблокируем кнопку в зависимости от валидности формы
  buttonSubmit.disabled = !isFormValid;
  
  // Добавляем или удаляем класс отключенной кнопки
  buttonSubmit.classList.toggle('popup__button_disabled', !isFormValid);
};

/** Функция добавления слушателей ко всем инпутам */
const addInputListeners = (form, config) => {
  // Получаем массив всех инпутов формы по селектору из конфигурации
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  // Перебираем каждый инпут и добавляем обработчик события input
  inputList.forEach((input) =>
    input.addEventListener('input', (evt) => handleFormInput(evt, config))
  );
};
