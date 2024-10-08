# Анекдоты localhost v2
Анекдоты localhost - страничка для чтения анекдотов со своего сервера (Версия 1: https://github.com/An-Vas/anekdoty_webpage). 

### Quick Start

Для запуска проекта нужно выполнить из консоли команды:

cd  ...путь на вашем компьютере.../anekdoty_webpage_v2

npm run build-client

npm run build-server

npm run start

### Что нового:
###### Версия от 23.09.2024

Добавлена возможность голосовать за понравившийся анекдот. Рендер клиентской части перенесен на сервер. 

###### Версия от 09.09.2024


Клиентская часть переписана с использованием библиотеки react. Обновлен дизайн изменения анекдота для админов.

### Структура проекта
Файлы проекта разделены на папки server и client.
В client лежат страницы сайта для отображения, стили, а также скрипты, выполняемые браузером при загрузке страницы.
В server - функционал серверной части - доступ к бд, обработка запросов, которые может послать клиент. Функционал бекенда разделен на логические модули: anekdoty_parser (парсер для обновления локальной базы данных за счет получения анекдотов из сети интернет с сайта https://anekdoty.ru/), auth (функционал связанный с регистрацией пользователей и проверкой ролей перед выдачей доступа), db (вся логика обращения к базе данных сервера), jokes (логика обработки запросов браузера на получение списка анекдотов, категорий, изменения анекдотов для админа и т.п.).
### Функционал проекта
Возможно существование трех видов пользователей: незарегистрированный пользователь, зарегистрированный пользователь и администратор. Незарегистрированный пользователь может просмотреть список категорий анекдотов, которые есть на сервере, а также загрузить новые анекдоты из интернета на сервер (чтобы увидеть всё многообразие возможных категорий анекдотов, которые он сможет прочитать, если зарегистрируется). Обычный пользователь может просматривать анекдоты по категориям. Админ может изменить любой анекдот через функционал сайта. На данный момент, чтобы стать админом, при регистрации нужно поставить галочку "я админ" в форме регистрации.