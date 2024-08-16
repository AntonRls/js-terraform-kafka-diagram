# terraform-js-parser
Небольшая библиотека для парсинга terraform конфига для Кафки

## Установка
```node
npm install terraform-parser@1.0.0
```

## Использование
```Javascript
const fs = require('fs');
const parser = require('terraform-parser');

//Получаем массив строк .tf файла
var text = fs.readFileSync("kafka.tf")
let lines = text.toString().split("\n")

//Передаём в библиотеку для парсинга
kafka_users = parser.getKafkaUsers(lines)
kafka_topics = parser.getKafkaTopics(lines)
```

* Можно спарсить раздел kafka_users и раздел kafka_topics
