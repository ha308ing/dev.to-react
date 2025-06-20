# Проект: Лента статей с сортировкой

## Цель:

Создать React application, которое получает статьи с DEV.to API и позволяет сортировать.

## API

https://dev.to/api/articles?tag=react

## Функционал:

- Создание проекта
    - Структурировать по папкам: `components`, `pages`, `services` и т.д.
- Загрузка статей
    - Получить статьи через `useEffect` и `async/await`
    - Показать loader при загрузке
    - Сохранить данные в `useState` и отобразить:
        - `title`, `cover image`, `user.name`, `tags`, `reading_time_minutes`
- Сортировка
    - Селект с вариантами:
        - A-Z
        - Z-A
        - Без сортировки
    - Кастомная функция сортировки по `title`
- Детальная страница статьи
    - При клике на статью — переход на `/article/:id`
    - На странице отобразить:
        - `title`, `description`, `cover image`, `published date`, `tags`
    - Использовать React Router для навигации
