По умолчанию используется конфигурация main для gulp и webpack, т.е. конфигурация, не предназначенная для взаимодействия с сервером.
Если необходимо работать с бэком (public_html), то нужно передать название конфига в команду напрямую. 
Например, запустить конфиг back в webpack: npm run wp:команда -- --config webpack.config.back.js
Для Gulp: npm gulp:команда -- --key back.

Сборка проекта:
1) gulp clean //очистить dist
2) npm run wp:build //собрать скрипты
3) npm run gulp:build //собрать все остальное

Начать/продолжить разработку (live-server на gulp):
1) gulp clean //удалить все из папки dist
2) npm run wp:dev-watch //собрать все из src_wp и следить за изменениями
3) npm run gulp:dev-server //собрать все из src в режиме dev, открыть livereload и следить за изменениями

Начать/продолжить разработку (live-server на webpack с горячей перезагрузкой модулей):
1) gulp clean //удалить все из папки dist
2) npm run gulp:dev-watch //собрать все из src в режиме dev и следить за изменениями
3) npm run wp:dev-server //собрать все из src_wp и открыть webpack-dev-server, следя за изменениями в памяти

Начать/продолжить разработку (без live-server):
1) gulp clean //удалить все из папки dist
2) npm run gulp:dev-watch //собрать все из src в режиме dev и следить за изменениями
3) npm run wp:dev-watch //собрать все из src_wp в режиме dev и следить за изменениями
