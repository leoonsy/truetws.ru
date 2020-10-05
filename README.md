Одностраничный сайт с 0 по продаже беспроводных наушников i12 TWS.
=============================
Адаптивен под мобильные устройства. Написан с 0 на HTML + CSS + JS + PHP. Собственный такой себе дизайн (верстал с головы)).  

Конфигурация
-----------------------------------
Конфигурация сборки находится в файле .env.
Возможные значения:
- **MODE** = development/production
- **CONFIG** = main/back/...

**main config** используется обычно для верстки (т.е. без использования веб-сервера apache/nginx и т.п.).

**back config** используется уже с веб-сервером, например, для натяжки на движок CMS. 

Команды
-----------------------------------
**Очистка проекта**: npm run clean

**Сборка проекта**:
* npm run wp:build //webpack сборка (обычно скрипты)
* npm run gulp:build //gulp сборка (все остальное)

**Начать/продолжить разработку (live-server на gulp)**:
* npm run wp:watch //собрать все и следить за изменениями
* npm run gulp:server //собрать все, открыть livereload и следить за изменениями

**Начать/продолжить разработку (live-server на webpack с горячей перезагрузкой модулей)**:
* npm run gulp:watch //собрать все следить за изменениями
* npm run wp:server //собрать все, открыть webpack-dev-server, следя за изменениями в памяти

**Начать/продолжить разработку (без live-server)**:
* npm run gulp:watch //собрать все и следить за изменениями
* npm run wp:watch //собрать все и следить за изменениями