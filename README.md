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

Если необходимо запустить отдельную конфигурацию webpack или gulp, нужно передать параметры npm или данным командам напрямую. 
Например, запустить конфиг main в webpack: npm run wp:команда --config-name main
По умолчанию запускаются все конфигурации в webpack. 
Для Gulp можно передать ключ, устанавливающий пути src и dist. Например, npm gulp:команда -- --key root. По умолчанию key = root.
