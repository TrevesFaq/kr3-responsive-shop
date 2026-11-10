# Lighthouse-проверка

Сюда нужно сохранить отчёт Lighthouse по категории **Accessibility**. Методичка просит проверить минимум `index.html`, `catalog.html` и `order.html`.

Локальный браузер проверки не смог открыть `localhost` проекта, поэтому настоящий Lighthouse-отчёт здесь пока отсутствует. Чтобы завершить практическую работу:

1. Откройте терминал в корне `kr3-responsive-shop`.
2. Запустите `python -m http.server 8000`.
3. Откройте `http://localhost:8000` в Chrome.
4. В DevTools откройте Lighthouse, выберите категорию Accessibility и проверьте главную, каталог и форму.
5. Сохраните отчёт как `lighthouse/accessibility-report.html`.
6. Добавьте найденные проблемы и исправления в раздел Lighthouse файла `README.md`.
