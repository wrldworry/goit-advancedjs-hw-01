// Task 2 - Form

// Оголошуємо об'єкт formData поза будь-якими функціями
const formData = { email: '', message: '' };
const STORAGE_KEY = 'feedback-form-state';

// Отримуємо посилання на форму
const form = document.querySelector('.feedback-form');

// Функція для збереження даних у localStorage
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Функція для завантаження даних з localStorage
function loadFromStorage() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Оновлюємо formData з збережених даних
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';

      // Заповнюємо поля форми
      const emailInput = form.elements.email;
      const messageTextarea = form.elements.message;

      emailInput.value = formData.email;
      messageTextarea.value = formData.message;
    }
  } catch (error) {
    console.log('Error loading from storage:', error);
  }
}

// Функція для очищення форми та сховища
function clearForm() {
  formData.email = '';
  formData.message = '';
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
}

// Обробник події input через делегування
form.addEventListener('input', event => {
  const { name, value } = event.target;

  // Перевіряємо, чи це одне з наших полів
  if (name === 'email' || name === 'message') {
    // Оновлюємо formData (зберігаємо БЕЗ пробілів по краях)
    formData[name] = value.trim();
    // Зберігаємо у localStorage
    saveToStorage();
  }
});

// Обробник події submit
form.addEventListener('submit', event => {
  event.preventDefault();

  // Перевіряємо, чи всі поля заповнені
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  // Виводимо дані у консоль з актуальними значеннями
  console.log(formData);

  // Очищаємо форму та сховище
  clearForm();
});

// Завантажуємо дані при завантаженні сторінки
document.addEventListener('DOMContentLoaded', loadFromStorage);
