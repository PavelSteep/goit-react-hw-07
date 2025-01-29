// Импортируем необходимые зависимости
import React, { useMemo } from 'react'; // useMemo используется для мемоизации значений, чтобы избежать ненужных пересчётов
import { useSelector } from 'react-redux'; // useSelector позволяет получить данные из Redux-хранилища
import Contact from '../Contact/Contact'; // Импортируем компонент для отображения одного контакта
import css from './ContactList.module.css'; // Импортируем стили для компонента ContactList

// Определяем функциональный компонент ContactList
const ContactList = () => {
  // Получаем список всех контактов из Redux-хранилища
  // Если свойство `contacts` или `items` отсутствует, возвращаем пустой массив (защита от ошибок)
  const contacts = useSelector(state => state.contacts?.items || []);

  // Получаем текущее значение фильтра из Redux-хранилища
  // Преобразуем его в нижний регистр для корректного сравнения
  // Если свойство `filters` или `name` отсутствует, возвращаем пустую строку
  const filter = useSelector(state => state.filters?.name?.toLowerCase() || '');

  // Мемоизируем список видимых контактов, чтобы не пересчитывать его при каждом рендере
  // Пересчёт происходит только при изменении `contacts` или `filter`
  const visibleContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name?.toLowerCase().includes(filter) // Сравниваем имя контакта с фильтром
    );
  }, [contacts, filter]); // Зависимости мемоизации: контакты и фильтр

  // Возвращаем JSX-разметку для списка контактов
  return (
    <ul className={css['contact-list']}>
      {visibleContacts.length > 0 ? ( // Если есть контакты для отображения
        visibleContacts.map(({ id, name, phone }) =>
          id && name && phone ? ( // Проверяем наличие всех данных контакта
            <Contact key={id} id={id} name={name} phone={phone} /> // Рендерим компонент Contact для каждого контакта
          ) : null // Если данных не хватает, ничего не рендерим
        )
      ) : (
        <li>No contacts to display</li> // Если видимых контактов нет, выводим сообщение
      )}
    </ul>
  );
};

// Экспортируем компонент ContactList для использования в других частях приложения
export default ContactList;
